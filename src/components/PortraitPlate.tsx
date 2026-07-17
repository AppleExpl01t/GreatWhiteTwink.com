import portrait from '../assets/portrait.jpg'

/* the plate: one photo, screened at 15° like everything else here. */
export default function PortraitPlate() {
  return (
    <div className="plate-wrap">
      <svg className="reg" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <path d="M12 0v24M0 12h24" />
      </svg>
      <figure className="plate">
        <img
          src={portrait}
          width={684}
          height={900}
          fetchPriority="high"
          alt="Great White Twink — a white-maned shark in a leather muzzle harness and studded collar, one hand raised, shot in high-contrast black and white."
        />
      </figure>
    </div>
  )
}
