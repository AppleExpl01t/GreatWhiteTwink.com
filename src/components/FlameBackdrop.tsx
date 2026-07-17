import { useEffect, useRef } from 'react'

/*
 * The ground layer: a flame, reproduced the only way this page reproduces
 * anything — through a halftone screen. Raw WebGL, no library. A value-noise
 * flame field is sampled once per screen cell (15°, the same angle as the
 * portrait plate) and printed as hard-edged toner dots rising from the
 * bottom of the viewport. Near-black on near-black; only the hottest cells
 * get the one cold blue this page owns. No glow, no bloom, no orange.
 *
 * Discipline:
 *  - prefers-reduced-motion  → a single still frame, no loop
 *  - hidden tab              → loop parked
 *  - no WebGL                → static 2D-canvas toner scatter
 *  - frame rate              → capped at 30fps; this is texture, not a demo
 *  - devicePixelRatio        → capped at 1.5; dots don't need retina
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  u_res;    /* canvas size, device px */
uniform float u_time;   /* seconds, wrapped CPU-side so precision holds */
uniform float u_cell;   /* halftone cell, device px */
uniform float u_invert; /* 0 = positive plate, 1 = negative */

/* Hoskins hash — keeps intermediates small so fract() stays precise */
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),                  hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

/* flame intensity at a point (device px). anchored to the bottom edge. */
float flame(vec2 px) {
  vec2 p = px / u_res.y;
  float t = u_time;
  float n = fbm(p * 3.0 - vec2(0.0, t * 0.10));
  n += 0.55 * fbm(p * 7.5 - vec2(t * 0.015, t * 0.23));
  n /= 1.55;
  /* heat: full strength at the bottom edge, gone ~60% up the viewport */
  float heat = pow(smoothstep(0.60, 0.0, p.y), 1.7);
  return clamp(n * (0.20 + 1.15 * heat) - 0.24, 0.0, 1.0);
}

void main() {
  /* the screen. 15 degrees, hard dots, sampled per cell — printed, not smeared */
  float c = cos(0.2618), s = sin(0.2618);
  mat2 R  = mat2(c, s, -s, c);
  mat2 Ri = mat2(c, -s, s, c);

  vec2 g   = R * gl_FragCoord.xy;
  vec2 id  = floor(g / u_cell);
  vec2 cuv = fract(g / u_cell) - 0.5;
  vec2 ctr = Ri * ((id + 0.5) * u_cell);

  float v = flame(ctr);

  /* stray toner above the flame line so the whole ground breathes.
     repositions every 2s in a hard step — sparkle, never fade. */
  float stray = step(0.9855, hash(id + floor(u_time * 0.5))) * 0.22;
  v = max(v, stray);

  float r  = v * 0.62;
  float aa = 1.4 / u_cell;
  float dot_ = 1.0 - smoothstep(r - aa, r + aa, length(cuv));

  vec3 ink   = vec3(0.031, 0.035, 0.043);  /* #08090B — the ground */
  vec3 toner = vec3(0.090, 0.106, 0.129);  /* one step above it */
  vec3 chill = vec3(0.157, 0.220, 0.298);  /* the accent, held way down */

  vec3 col = mix(ink, mix(toner, chill, smoothstep(0.50, 0.92, v)), dot_);
  col = mix(col, vec3(1.0) - col, u_invert);
  gl_FragColor = vec4(col, 1.0);
}
`

/* all time multipliers divide evenly into 200s, so the wrap is seamless */
const TIME_PERIOD = 200
/* the still frame shown under prefers-reduced-motion: mid-flame, not frame zero */
const STILL_TIME = 41.7
const FRAME_MS = 1000 / 30
const MAX_DPR = 1.5
const CELL_CSS_PX = 3 /* matches the portrait plate's 3px screen */

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh)
    return null
  }
  return sh
}

/* no WebGL: one quiet, seeded toner scatter. static is fine — it's a flyer. */
function drawFallback(canvas: HTMLCanvasElement, inverted: boolean) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
  const w = (canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr)))
  const h = (canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr)))
  ctx.fillStyle = inverted ? '#F1F4F7' : '#08090B'
  ctx.fillRect(0, 0, w, h)
  let seed = 1337
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const dots = Math.round((w * h) / 2400)
  for (let i = 0; i < dots; i++) {
    const x = rand() * w
    const y = h - Math.pow(rand(), 2.4) * h /* bottom-heavy, like the shader */
    const hot = rand() < 0.06
    ctx.fillStyle = inverted
      ? hot ? '#D7C7B3' : '#E8E4DE'
      : hot ? '#28384C' : '#171B21'
    const size = 1 + rand() * 1.5 * dpr
    ctx.fillRect(x, y, size, size)
  }
}

export default function FlameBackdrop({ inverted }: { inverted: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const invertRef = useRef(inverted)
  const redrawRef = useRef<(() => void) | null>(null)

  /* the toggle repaints without tearing down the loop */
  useEffect(() => {
    invertRef.current = inverted
    redrawRef.current?.()
  }, [inverted])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })

    /* ResizeObserver, not window.resize: it also fires when the stylesheet
       lands after mount, when the mobile URL bar collapses, etc. */
    if (!gl || gl.isContextLost()) {
      const paint = () => drawFallback(canvas, invertRef.current)
      paint()
      redrawRef.current = paint
      const ro = new ResizeObserver(paint)
      ro.observe(canvas)
      return () => {
        ro.disconnect()
        redrawRef.current = null
      }
    }

    let program: WebGLProgram | null = null
    let uRes: WebGLUniformLocation | null = null
    let uTime: WebGLUniformLocation | null = null
    let uCell: WebGLUniformLocation | null = null
    let uInvert: WebGLUniformLocation | null = null
    let raf = 0
    let last = 0
    const start = performance.now()
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const setup = () => {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      if (!vs || !fs) return false
      program = gl.createProgram()
      if (!program) return false
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false
      gl.useProgram(program)

      /* one triangle that covers the screen */
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(program, 'a_pos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

      uRes = gl.getUniformLocation(program, 'u_res')
      uTime = gl.getUniformLocation(program, 'u_time')
      uCell = gl.getUniformLocation(program, 'u_cell')
      uInvert = gl.getUniformLocation(program, 'u_invert')
      return true
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const draw = (timeSec: number) => {
      if (!program) return
      const dpr = canvas.width / Math.max(1, canvas.clientWidth)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, timeSec % TIME_PERIOD)
      gl.uniform1f(uCell, CELL_CSS_PX * dpr)
      gl.uniform1f(uInvert, invertRef.current ? 1 : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const now = () => (performance.now() - start) / 1000

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (t - last < FRAME_MS) return
      last = t
      draw(now())
    }

    /* run, or print one still frame — depending on the visitor's settings */
    const runOrStill = () => {
      cancelAnimationFrame(raf)
      resize()
      if (reduceMq.matches) draw(STILL_TIME)
      else raf = requestAnimationFrame(loop)
    }

    redrawRef.current = () => draw(reduceMq.matches ? STILL_TIME : now())

    const onResize = () => {
      resize()
      if (reduceMq.matches) draw(STILL_TIME)
    }
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else runOrStill()
    }
    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
    }
    const onRestored = () => {
      if (setup()) runOrStill()
    }

    if (!setup()) {
      /* driver refused the shader — print a still sheet instead */
      const paint = () => drawFallback(canvas, invertRef.current)
      paint()
      redrawRef.current = paint
      const ro = new ResizeObserver(paint)
      ro.observe(canvas)
      return () => {
        ro.disconnect()
        redrawRef.current = null
      }
    }

    runOrStill()
    const ro = new ResizeObserver(onResize)
    ro.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    reduceMq.addEventListener('change', runOrStill)
    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)

    /* no loseContext() here: React keeps the DOM node across StrictMode
       remounts, and a deliberately-lost context would stay lost. */
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reduceMq.removeEventListener('change', runOrStill)
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      redrawRef.current = null
    }
  }, [])

  return <canvas ref={canvasRef} className="backdrop" aria-hidden="true" />
}
