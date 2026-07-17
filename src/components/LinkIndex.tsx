import { links } from '../content/site'

/*
 * The Index. No buttons, no cards — rows, like a table of contents.
 * A row doesn't scale or glow on touch; it inverts, and the claw tears
 * through it. Tags are taxonomy (what you get when you tap), not chrome.
 */
export default function LinkIndex() {
  return (
    <nav className="idx" aria-label="Links">
      <h2>The Index</h2>
      {links.map(({ tag, label, sub, href }) => (
        <a className="row" key={href} href={href} rel="me">
          <span className="claw" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="tag">{tag}</span>
          <span>
            <span className="dest">{label}</span>
            <span className="sub">{sub}</span>
          </span>
          <svg className="fin" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 20h20L13 3 8 14l-3-2z" />
          </svg>
        </a>
      ))}
    </nav>
  )
}
