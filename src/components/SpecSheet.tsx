import { spec } from '../content/site'

/* spec cells. facts and printing gags — never invented audience numbers.
   the `hot` cell prints inverted: monochrome emphasis is more ink. */
export default function SpecSheet() {
  return (
    <dl className="spec">
      {spec.map(({ k, v, hot }) => (
        <div key={k} className={hot ? 'hot' : undefined}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}
