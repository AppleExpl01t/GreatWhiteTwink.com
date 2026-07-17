# greatwhitetwink.com

Link-in-bio site for [@greatwhitetwink](https://x.com/greatwhitetwink).
The design concept is a misprinted xerox flyer — the full brief lives in
[DESIGN.md](DESIGN.md). Read that before changing anything visual.

## Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4 (via `@tailwindcss/vite` — no PostCSS config)
- Framer Motion (the edge-slug marquee; everything else is CSS)
- Hand-written WebGL for the flame backdrop
  ([src/components/FlameBackdrop.tsx](src/components/FlameBackdrop.tsx)) — no library
- Self-hosted fonts via Fontsource (no Google Fonts request)

## Working on it

```sh
npm install
npm run dev      # dev server
npm run build    # typecheck + production build into dist/
npm run lint     # eslint
npm run preview  # serve the production build locally
```

## Editing content

Links, taglines, the follow-for list, spec cells, and the commission
status all live in **[src/content/site.ts](src/content/site.ts)**. For a copy
change or a new link that's the only file to touch. To flip commissions to
closed, change `commissions.status` there.

The portrait is [src/assets/portrait.jpg](src/assets/portrait.jpg) (684×900).
If you replace it, keep the alt text in
[PortraitPlate.tsx](src/components/PortraitPlate.tsx) honest and update the
`aspect-ratio` in `index.css` if the dimensions change. `public/og.jpg` is the
social-share image — usually the same photo.

## Deploy

Cloudflare Workers static assets, configured in
[wrangler.jsonc](wrangler.jsonc). With the repo linked to Workers Builds:

- build command: `npm run build`
- deploy command: `npx wrangler deploy`

The site is an SPA (`not_found_handling: single-page-application`), though it
only has the one route.
