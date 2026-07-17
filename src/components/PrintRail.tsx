/* the top rail: this flyer is the print edition of the X profile. */
export default function PrintRail() {
  return (
    <div className="rail">
      <svg className="glyph" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" />
        <ellipse cx="12" cy="12" rx="4" ry="9.5" />
        <path d="M2.5 12h19" />
      </svg>
      <span className="mono" style={{ color: 'var(--color-paper)' }}>
        Twitter&nbsp;/&nbsp;X
      </span>
      <span className="hr" />
      <span className="spark" aria-hidden="true">
        ✦
      </span>
      <span className="kanji" lang="ja" title="densetsu — legend">
        伝説
      </span>
    </div>
  )
}
