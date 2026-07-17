# The decision

This page is a **misprinted xerox flyer**, not an app. The entire
interaction language is the printing press: registration error, plate
inversion, the halftone screen. Radius is 0 everywhere. There are no
buttons — there are rows. If a change wouldn't make sense on a flyer
stapled to a venue door, it doesn't belong here.

The signature element is the **misregistered masthead**: the second
strike printed 2px out of line in the same black ink, snapping into
register on load. That is the one page-load moment. Don't add a second
one.

## Palette — five values, nothing else

| Token      | Hex       | Job                                            |
| ---------- | --------- | ---------------------------------------------- |
| `ink`      | `#0A0A0A` | the ground. near-black paper                   |
| `paper`    | `#F2F2F2` | blown white. type + the inverted blocks        |
| `silver`   | `#8F8F8F` | utility text — 6.1:1 on ink                    |
| `rule`     | `#272727` | hairlines. decorative only, never text         |
| `dim`      | `#4E4E4E` | secondary text on the white blocks — 7.4:1     |

Every one of them is gray. Type and logos are a **one-plate black job**
— there is no accent hue in the page's ink, and emphasis is done the way
a press does it: **more ink** (inversion), never color. That is why the
hot spec cell and the slab print as white blocks rather than tinted
text. No colored glows, no saturated shadows, no tints.

This is not "dark mode by default": there is no light version of this
brand. Because the plate is a single black, the `html.neg` flip is an
exact photographic negative. The chrome bands in the masthead are
achromatic metal, not gradient text. Tailwind's default palette, radii,
shadows and blurs are deleted in `@theme` (`src/index.css`), so
off-palette utilities don't compile to anything. Keep it that way.

## Type — four roles

- **Anton** — display. Masthead, row destinations, slab headline.
- **Archivo** (variable, wdth 62–125) — body. Worked at extremes:
  900 weight at 62% width against 200 weight at 125% width.
- **DM Mono** — the printer's voice: tags, captions, tools, edge slug.
- **New Rocker** — used exactly once ("Twink"). That's the deal.
  Chosen over a brush script on the client's call: sharp and edgy,
  never flamboyant or soft.

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
  notice, turn it down. It is the one place a cold tint survives: the
  hottest cells lift toward `vec3(0.157, 0.220, 0.298)`, held way down
  and hardcoded in the shader, not read from the palette. That is
  deliberate — the ink is monochrome, the toner haze is not.

## Anti-brief

Not a SaaS page. No gradients (chrome bands excepted — they're hard
stops), no glassmorphism, no icon-card grids, no stat banners, no pill
badges, no FAQ, no emoji in the UI, no Inter/Space Grotesk/Fraunces.

## Floor

WCAG 2.2 AA: 4.5:1 body text, 3:1 large text and UI, visible focus
indicators (2px `paper` outline on ink; 2px `ink` outline on paper).
Error copy names what happened and what to do, in the product's voice,
without apologizing.
