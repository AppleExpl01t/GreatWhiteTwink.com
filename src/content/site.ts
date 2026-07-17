/*
 * Everything editable lives here. Copy, links, commission status.
 * If you're updating the site, this file is probably the only one you need.
 *
 * House rule, inherited from the flyer: nothing on this page is invented.
 * Every href is a live profile. Every number is real or an obvious joke
 * (85 LPI is a printing gag, not a metric). No fake stats, ever.
 */

export const site = {
  name: 'Great White Twink',
  handle: '@greatwhitetwink',
  /* home base. the flyer is the print edition of the X profile. */
  homeUrl: 'https://x.com/greatwhitetwink',
  tagline: 'Stay sharp. Stay salty.',
  edition: 'GWT · 001',
}

export type LinkRow = {
  /* taxonomy, not decoration: what you get when you tap */
  tag: string
  label: string
  sub: string
  href: string
}

export const links: LinkRow[] = [
  {
    tag: 'ART/',
    label: 'X / Twitter',
    sub: '@greatwhitetwink',
    href: 'https://x.com/greatwhitetwink',
  },
  {
    tag: 'ART/',
    label: 'Bluesky',
    sub: 'the backup timeline',
    href: 'https://bsky.app/profile/greatwhitetwink.bsky.social',
  },
  {
    tag: 'STILLS/',
    label: 'Instagram',
    sub: 'renders, behaving themselves',
    href: 'https://www.instagram.com/greatwhitetwink/',
  },
  {
    tag: 'CLIPS/',
    label: 'TikTok',
    sub: 'you probably came from here',
    href: 'https://www.tiktok.com/@greatwhitetwink',
  },
  {
    tag: 'LIVE/',
    label: 'Joystick',
    sub: '18+ · come get bitten',
    href: 'https://joystick.tv/u/GreatWhiteTwink',
  },
  {
    tag: 'GIFT/',
    label: 'Throne',
    sub: 'chum in the water',
    href: 'https://throne.com/greatwhitetwink',
  },
]

/* the press-sheet edge marking under the portrait. loops. */
export const edgeSlug =
  'STAY SHARP ✦ STAY SALTY ✦ GREAT WHITE TWINK ✦ 伝説 ✦ 85 LPI ✦ ONE PLATE, BLACK ✦ '

export const followFor = ['3D Art', 'Furry Vibes', 'Chaotic Energy', 'Great Content']

export const spec = [
  { k: 'Bite', v: '100%', hot: true },
  { k: 'Output', v: '3D + Stills', hot: false },
  { k: 'Screen', v: '85 LPI', hot: false },
  { k: 'Ink', v: '1 Plate, Black', hot: false },
]

export const commissions = {
  /* flip to 'closed' and the state line rewrites itself */
  status: 'open' as 'open' | 'closed',
  stateText: {
    open: 'OPEN',
    closed: 'CLOSED — WAITLIST VIA DM',
  },
  body:
    '3D character work, avatar refits, and stills. Send a ref sheet and ' +
    'what you want it doing. Quotes come back within a couple of days.',
  /* Routes to X DMs for now. When a real brief form exists, point this
     at it and change the label to match — one name for one action. */
  cta: { label: 'DM a ref sheet', href: 'https://x.com/greatwhitetwink' },
}
