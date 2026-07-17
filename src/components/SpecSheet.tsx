import { spec } from '../content/site'

/* spec cells. facts and printing gags — never invented audience numbers. */
export default function SpecSheet() {
  return (
    <dl className="spec">
      {spec.map(({ k, v, hot }) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd className={hot ? 'hot' : undefined}>{v}</dd>
        </div>
      ))}
    </dl>
  )
}
