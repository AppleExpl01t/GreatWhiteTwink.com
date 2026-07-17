/*
 * The masthead. Two lines of airbrushed chrome with the ice-blue plate
 * printed 2px out of register — the page-load animation is the press
 * pulling that plate back into line. The script line is the one and only
 * appearance of the brush face.
 */
export default function Masthead() {
  return (
    <header className="mast">
      <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' }}>
        Great White Twink
      </h1>
      <span className="ln" aria-hidden="true">
        <span className="ghost">GREAT</span>
        <span className="word">GREAT</span>
      </span>
      <span className="ln" aria-hidden="true">
        <span className="ghost">WHITE</span>
        <span className="word">WHITE</span>
      </span>
      <span className="script" aria-hidden="true">
        Twink
        <svg className="heart" viewBox="0 0 48 44">
          <path d="M24 40C16 33 4 26 4 15.5 4 9 9 5 14 5c4 0 8 3 10 7 2-4 6-7 10-7 5 0 10 4 10 10.5C44 26 32 33 24 40Z" />
        </svg>
      </span>
    </header>
  )
}
