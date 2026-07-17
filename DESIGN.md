# The decision

This page is a **misprinted xerox flyer**, not an app. The entire
interaction language is the printing press: registration error, plate
inversion, the halftone screen. Radius is 0 everywhere. There are no
buttons — there are rows. If a change wouldn't make sense on a flyer
stapled to a venue door, it doesn't belong here.

The signature element is the **misregistered masthead**: the ice-blue
plate printed 2px out of line, snapping into register on load. That is
the one page-load moment. Don't add a second one.

## Palette — five values, nothing else

| Token      | Hex       | Job                                            |
| ---------- | --------- | ---------------------------------------------- |
| `ink`      | `#08090B` | the ground. near-black paper                   |
| `paper`    | `#F1F4F7` | blown white. type + the one inverted slab      |
| `silver`   | `#8B929B` | utility text — 6.2:1 on ink                    |
| `chill`    | `#A8C6E8` | THE accent. cold ice-blue — 11.2:1 on ink      |
| `rule`     | `#23272D` | hairlines. decorative only, never text         |
| `dim`      | `#4A4E54` | secondary text on the white slab — 7.6:1       |

This is not "dark mode by default": there is no light version of this
brand. The accent is ink, never light — no colored glows, no saturated
shadows, anywhere. The chrome bands in the masthead are achromatic
metal, not gradient text. Tailwind's default palette, radii, shadows and
blurs are deleted in `@theme` (`src/index.css`), so off-palette
utilities don't compile to anything. Keep it that way.

## Type — four roles

- **Anton** — display. Masthead, row destinations, slab headline.
- **Archivo** (variable, wdth 62–125) — body. Worked at extremes:
  900 weight at 62% width against 200 weight at 125% width.
- **DM Mono** — the printer's voice: tags, captions, tools, edge slug.
- **Caveat Brush** — used exactly once ("Twink"). That's the deal.

## Structure rules

- One column, max-width 520px, mobile first. The audience arrives from
  a TikTok bio on a phone.
- Devices must encode something true: the barcode encodes the handle,
  the tags are taxonomy, the spec cells are facts or obvious print
  gags. No invented stats, testimonials, or logos — ever.
- Motion is print motion: `steps()`, inversion, hard cuts. Nothing
  fades, nothing floats, nothing scales on hover. Everything respects
  `prefers-reduced-motion`.
- The flame backdrop is ground texture, not a hero effect. It stays
  near-black, hard-dotted, and quiet. If it's the first thing you
  notice, turn it down.

## Anti-brief

Not a SaaS page. No gradients (chrome bands excepted — they're hard
stops), no glassmorphism, no icon-card grids, no stat banners, no pill
badges, no FAQ, no emoji in the UI, no Inter/Space Grotesk/Fraunces.

## Floor

WCAG 2.2 AA: 4.5:1 body text, 3:1 large text and UI, visible focus
indicators (2px `chill` outline on ink; 2px `ink` outline on paper).
Error copy names what happened and what to do, in the product's voice,
without apologizing.
