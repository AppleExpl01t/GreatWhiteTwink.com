import { followFor } from '../content/site'

/* the client's own list, verbatim. four items because they said four things. */
export default function FollowFor() {
  return (
    <section className="follow">
      <h2>Follow for</h2>
      <ul>
        {followFor.map((item) => (
          <li key={item}>
            <i aria-hidden="true">★</i>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
