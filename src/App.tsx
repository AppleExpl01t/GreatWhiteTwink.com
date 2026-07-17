import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import FlameBackdrop from './components/FlameBackdrop'
import PrintRail from './components/PrintRail'
import Masthead from './components/Masthead'
import PortraitPlate from './components/PortraitPlate'
import EdgeSlug from './components/EdgeSlug'
import Ident from './components/Ident'
import FollowFor from './components/FollowFor'
import SpecSheet from './components/SpecSheet'
import LinkIndex from './components/LinkIndex'
import CommissionSlab from './components/CommissionSlab'
import Colophon from './components/Colophon'

/*
 * One sheet, top to bottom. The concept is a misprinted xerox flyer:
 * the flame backdrop is the ground the sheet lies on, .page is the sheet.
 * `neg` flips the whole plate — see index.css for why the backdrop
 * inverts in-shader instead of through the CSS filter.
 */
export default function App() {
  const [neg, setNeg] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('neg', neg)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', neg ? '#F1F4F7' : '#08090B')
  }, [neg])

  return (
    <MotionConfig reducedMotion="user">
      <FlameBackdrop inverted={neg} />
      <div className="page">
        <div className="grain" aria-hidden="true" />
        <main className="sheet">
          <PrintRail />
          <Masthead />
          <PortraitPlate />
          <EdgeSlug />
          <Ident />
          <FollowFor />
          <SpecSheet />
          <LinkIndex />
          <CommissionSlab />
          <Colophon neg={neg} onToggleNeg={() => setNeg((v) => !v)} />
        </main>
      </div>
    </MotionConfig>
  )
}
