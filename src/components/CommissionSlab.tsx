import { commissions } from '../content/site'

/* the one white block on a black page. flip `status` in content/site.ts. */
export default function CommissionSlab() {
  const { status, stateText, body, cta } = commissions
  return (
    <section className="slab" data-status={status}>
      <span className="k">Commissions</span>
      <h2>Get one made.</h2>
      <span className="state">{stateText[status]}</span>
      <p>{body}</p>
      <a className="go" href={cta.href}>
        {cta.label} <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}
