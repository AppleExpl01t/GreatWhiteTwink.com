# greatwhitetwink.com

Link-in-bio SPA. React 19 + TS + Vite + Tailwind v4 + Framer Motion,
deployed to Cloudflare Workers static assets (wrangler.jsonc).

## Design authority

DESIGN.md is the locked design decision. Follow it exactly; where it is
silent, ask — do not default. The short version: this is a misprinted
xerox flyer. Five colors (ink/paper/silver/chill/rule/dim), radius 0,
no shadows, no glass, no new fonts, motion is steps/inversion only.

Tailwind's default palette, radii, shadows and blurs are wiped in the
`@theme` block of src/index.css. That is deliberate and load-bearing:
`bg-indigo-500` or `rounded-2xl` compile to nothing here. Never
"fix" this by restoring the defaults or writing raw hex in components.

## Where things live

- src/content/site.ts — ALL editable copy, links, commission status
- src/index.css — the entire visual system, annotated
- src/components/ — presentational; keep them content-free
- Never invent a handle, a link, a stat, or a testimonial. If content
  is missing, leave the section out and say so.

## Commands

npm run dev / build (tsc + vite) / lint / preview
