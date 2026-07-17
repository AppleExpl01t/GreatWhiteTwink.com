import { useEffect, useRef, useState } from 'react'
import { site } from '../content/site'

/*
 * The barcode literally encodes the handle: each character prints one bar —
 * width from its charcode, vowels print short, the gap comes from the next
 * character along. Decoration is only allowed here when it encodes
 * something true, and this encodes fifteen letters of GREATWHITETWINK.
 */
function barsFor(text: string) {
  const chars = [...text.toUpperCase()]
  return chars.map((ch, i) => {
    const code = ch.charCodeAt(0)
    const next = chars[(i + 1) % chars.length].charCodeAt(0)
    return {
      w: 2 + (code % 4) * 2, /* 2 / 4 / 6 / 8px */
      short: 'AEIOU'.includes(ch),
      gap: i < chars.length - 1 ? 2 + (next % 3) * 2 : 0,
    }
  })
}

const BARS = barsFor('GREATWHITETWINK')

type CopyState = 'idle' | 'ok' | 'err'

const COPY_LABEL: Record<CopyState, string> = {
  idle: 'Copy the handle',
  ok: 'In your clipboard',
  /* error copy names what happened and what to do. it does not apologise. */
  err: 'Clipboard bit back — long-press the handle',
}

export default function Colophon({
  neg,
  onToggleNeg,
}: {
  neg: boolean
  onToggleNeg: () => void
}) {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const resetTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  const copyHandle = async () => {
    window.clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(site.handle)
      setCopyState('ok')
      resetTimer.current = window.setTimeout(() => setCopyState('idle'), 1800)
    } catch {
      setCopyState('err')
      resetTimer.current = window.setTimeout(() => setCopyState('idle'), 3000)
    }
  }

  return (
    <footer className="colo">
      <div className="bars" aria-hidden="true">
        {BARS.map((b, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <i className={b.short ? 'short' : undefined} style={{ width: b.w }} />
            {b.gap > 0 && <i className="g" style={{ width: b.gap }} />}
          </span>
        ))}
      </div>
      <div className="caption">
        <span className="mono">{site.tagline}</span>
        <span className="mono">{site.edition}</span>
      </div>

      <a className="handle" href={site.homeUrl} rel="me">
        {site.handle}
        <svg className="bird" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23 4.9a9 9 0 0 1-2.6.7 4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.9 1.1A4.5 4.5 0 0 0 11.7 8a12.8 12.8 0 0 1-9.3-4.7 4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6 4.5 4.5 0 0 0 3.6 4.5 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.3a12.7 12.7 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6A9.2 9.2 0 0 0 23 4.9Z" />
        </svg>
      </a>
      <div className="trace">Twitter&nbsp;/&nbsp;X</div>

      <div className="tools">
        <button
          type="button"
          onClick={copyHandle}
          data-state={copyState === 'idle' ? undefined : copyState}
        >
          {COPY_LABEL[copyState]}
        </button>
        <button type="button" onClick={onToggleNeg} aria-pressed={neg}>
          {neg ? 'Positive' : 'Negative'}
        </button>
      </div>

      <svg className="regfoot" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <path d="M12 0v24M0 12h24" />
      </svg>
    </footer>
  )
}
