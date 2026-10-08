import { useState, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import DesignerExperience from './DesignerExperience'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import PortfolioFooter from './PortfolioFooter'
import PersonalGuide from './PersonalGuide'

type Page = 'home' | 'designer' | 'photographer' | 'about' | 'contact'

const assetPathPrefix = '/assets'
const imgDesignerHero = `${assetPathPrefix}/designer/aca45.webp`
const imgPhotographerHero = `${assetPathPrefix}/4ea03.webp`

const knobBg = "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 9 9' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -0.82731 -0.82731 0 3.15 3.15)'><stop stop-color='rgba(90,90,90,1)' offset='0'/><stop stop-color='rgba(62,62,62,1)' offset='0.5'/><stop stop-color='rgba(34,34,34,1)' offset='1'/></radialGradient></defs></svg>\")"
const hingeGrad = "linear-gradient(116.56505117707799deg, rgb(74, 74, 74) 0%, rgb(46, 46, 46) 100%)"

// Subtle vertical wood grain pattern + depth gradient for door face
const doorFaceBg = [
  // depth gradient: lighter top, slightly warmer/darker bottom
  "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.06) 100%)",
  // fine vertical grain lines
  "repeating-linear-gradient(90deg, transparent 0px, transparent 5px, rgba(160,130,100,0.028) 5px, rgba(160,130,100,0.028) 6px)",
  // wider irregular grain bands
  "repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(140,110,80,0.018) 18px, transparent 36px)",
].join(", ")

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}

function InitialLoader({ leaving }: { leaving: boolean }) {
  return (
    <div className={`initial-loader${leaving ? ' initial-loader-leaving' : ''}`} aria-label="Loading Shashwat’s portfolio">
      <div className="initial-loader-content">
        <p>hey, i’m shashwat</p>
        <div className="initial-loader-track"><span /></div>
      </div>
    </div>
  )
}

// ── Desktop Door ──────────────────────────────────────────────────────────────

function DesktopDoor({
  side,
  onEnter,
  onStart,
}: {
  side: 'designer' | 'photographer'
  onEnter: () => void
  onStart?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const isLeft = side === 'designer'

  const handleClick = () => {
    if (busy) return
    setBusy(true)
    setOpen(true)
    onStart?.()
    setTimeout(onEnter, 1050)
  }

  return (
    <div
      className="relative shrink-0"
      style={{ width: 259.998, height: 509.988, perspective: '1100px', cursor: busy ? 'default' : 'pointer' }}
      onClick={handleClick}
    >
      {/* Image behind door */}
      <div
        className="absolute overflow-clip"
        style={{ left: 15.99, top: 15.99, width: 228.011, height: 478.001, background: isLeft ? '#ccc' : '#fff' }}
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={isLeft ? imgDesignerHero : imgPhotographerHero}
          fetchPriority="low"
          decoding="async"
          style={{ objectFit: isLeft ? 'cover' : 'contain', objectPosition: 'center' }}
        />
        <div className="absolute bg-[rgba(240,237,232,0.1)]" style={{ width: 228.011, height: 478.001 }} />
      </div>

      {/* Door face — rotates */}
      <div
        className="absolute"
        style={{
          left: 16, top: 15.99, width: 228, height: 478,
          background: '#f3f1ee',
          backgroundImage: doorFaceBg,
          boxShadow: '1px 2px 6px rgba(0,0,0,0.09)',
          transformOrigin: isLeft ? 'left center' : 'right center',
          transform: open ? `rotateY(${isLeft ? -82 : 82}deg)` : 'rotateY(0deg)',
          transition: 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
          zIndex: 2,
        }}
      >
        {/* Edge ambient shadow overlay */}
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.04), inset -3px 0 8px rgba(0,0,0,0.04), inset 0 8px 14px rgba(0,0,0,0.03)', pointerEvents: 'none' }} />
        {/* Top panel */}
        <div
          className="absolute border-[0.81px] border-solid pointer-events-none"
          style={{ height: 182, left: 27.5, top: 47.61, width: 173, borderColor: 'rgba(0,0,0,0.10)' }}
        >
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.07), inset 0 -1px 2px rgba(0,0,0,0.04), inset 2px 0 3px rgba(0,0,0,0.04), inset -2px 0 3px rgba(0,0,0,0.03)' }} />
          <div className="absolute inset-0 rounded-[inherit]" style={{ boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.55)' }} />
        </div>
        {/* Bottom panel */}
        <div
          className="absolute border-[0.81px] border-solid pointer-events-none"
          style={{ height: 191, left: 27.5, top: 248.66, width: 173, borderColor: 'rgba(0,0,0,0.10)' }}
        >
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.07), inset 0 -1px 2px rgba(0,0,0,0.04), inset 2px 0 3px rgba(0,0,0,0.04), inset -2px 0 3px rgba(0,0,0,0.03)' }} />
          <div className="absolute inset-0 rounded-[inherit]" style={{ boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.55)' }} />
        </div>
        {/* Hinge top */}
        <div
          className="absolute rounded-[1.5px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.3)]"
          style={{ backgroundImage: hingeGrad, height: 22, left: isLeft ? -2.01 : 219.01, top: 105.14, width: 11 }}
        />
        {/* Hinge bottom */}
        <div
          className="absolute rounded-[1.5px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.3)]"
          style={{ backgroundImage: hingeGrad, height: 22, left: isLeft ? -2.01 : 219.01, top: 320.25, width: 11 }}
        />
        {/* Handle */}
        <div
          className="absolute bg-gradient-to-b drop-shadow-[0px_1px_2px_rgba(0,0,0,0.35)] from-[#4a4a4a] rounded-[4px] to-[#303030]"
          style={{ height: 36, left: isLeft ? 205.01 : 13.99, top: 235.33, width: 9 }}
        >
          <div
            className="absolute rounded-[4.5px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.4)] size-[9px]"
            style={{ backgroundImage: knobBg, left: -0.01, top: 6.29 }}
          />
        </div>
      </div>

      {/* Casing frame */}
      <div
        className="absolute border-[#e4e1dc] border-[15.386px] border-solid pointer-events-none"
        style={{ inset: 0, zIndex: 3 }}
      >
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_0px_rgba(0,0,0,0.07),inset_2px_2px_0px_0px_rgba(255,255,255,0.5)]" />
      </div>

      {/* Floor threshold */}
      <div
        className="absolute bg-[#e4e1dc] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)]"
        style={{ height: 15.994, left: 0, top: 493.99, width: 259.998, zIndex: 4 }}
      />
    </div>
  )
}

// ── Mobile Door ───────────────────────────────────────────────────────────────

function MobileDoor({
  side,
  onEnter,
  onStart,
}: {
  side: 'designer' | 'photographer'
  onEnter: () => void
  onStart?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const isLeft = side === 'designer'

  const handleClick = () => {
    if (busy) return
    setBusy(true)
    setOpen(true)
    onStart?.()
    setTimeout(onEnter, 1050)
  }

  return (
    <div
      className="relative shrink-0"
      style={{ width: 112.604, height: 201.098, perspective: '700px', cursor: busy ? 'default' : 'pointer' }}
      onClick={handleClick}
    >
      {/* Image behind door */}
      <div
        className="absolute overflow-clip"
        style={{ left: 9.99, top: 9.99, width: 92.624, height: 181.118, background: isLeft ? '#ccc' : '#fff' }}
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={isLeft ? imgDesignerHero : imgPhotographerHero}
          fetchPriority="low"
          decoding="async"
          style={{ objectFit: isLeft ? 'cover' : 'contain', objectPosition: 'center' }}
        />
        <div className="absolute bg-[rgba(240,237,232,0.1)]" style={{ width: 92.624, height: 181.118 }} />
      </div>

      {/* Door face — rotates */}
      <div
        className="absolute"
        style={{
          left: 9.8, top: 10.05, width: 93, height: 181,
          background: '#f3f1ee',
          backgroundImage: doorFaceBg,
          boxShadow: '1px 2px 6px rgba(0,0,0,0.09)',
          transformOrigin: isLeft ? 'left center' : 'right center',
          transform: open ? `rotateY(${isLeft ? -82 : 82}deg)` : 'rotateY(0deg)',
          transition: 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
          zIndex: 2,
        }}
      >
        {/* Edge ambient shadow overlay */}
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.04), inset -2px 0 5px rgba(0,0,0,0.04), inset 0 5px 10px rgba(0,0,0,0.03)', pointerEvents: 'none' }} />
        {/* Top panel */}
        <div
          className="absolute border-[0.714px] border-solid pointer-events-none"
          style={{ height: 69, left: 11.5, top: 17.95, width: 70, borderColor: 'rgba(0,0,0,0.10)' }}
        >
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.07), inset 0 -1px 2px rgba(0,0,0,0.04), inset 1px 0 2px rgba(0,0,0,0.04)' }} />
          <div className="absolute inset-0 rounded-[inherit]" style={{ boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.55)' }} />
        </div>
        {/* Bottom panel */}
        <div
          className="absolute border-[0.714px] border-solid pointer-events-none"
          style={{ height: 72, left: 11.5, top: 94.34, width: 70, borderColor: 'rgba(0,0,0,0.10)' }}
        >
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.07), inset 0 -1px 2px rgba(0,0,0,0.04), inset 1px 0 2px rgba(0,0,0,0.04)' }} />
          <div className="absolute inset-0 rounded-[inherit]" style={{ boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.55)' }} />
        </div>
        {/* Hinge top */}
        <div
          className="absolute rounded-[1.5px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.3)]"
          style={{ backgroundImage: hingeGrad, height: 14, left: isLeft ? -1.81 : 87.81, top: 39.78, width: 7 }}
        />
        {/* Hinge bottom */}
        <div
          className="absolute rounded-[1.5px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.3)]"
          style={{ backgroundImage: hingeGrad, height: 14, left: isLeft ? -1.81 : 87.81, top: 121.28, width: 7 }}
        />
        {/* Handle */}
        <div
          className="absolute bg-gradient-to-b drop-shadow-[0px_1px_2px_rgba(0,0,0,0.35)] from-[#4a4a4a] rounded-[4px] to-[#303030]"
          style={{ height: 22, left: isLeft ? 78.82 : 8.18, top: 84.92, width: 6 }}
        >
          <div
            className="absolute rounded-[4.5px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.4)] size-[9px]"
            style={{ backgroundImage: knobBg, left: -1.51, top: 2.1 }}
          />
        </div>
      </div>

      {/* Casing frame */}
      <div
        className="absolute border-[#e4e1dc] border-[9.287px] border-solid pointer-events-none"
        style={{ inset: 0, zIndex: 3 }}
      >
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_0px_rgba(0,0,0,0.07),inset_2px_2px_0px_0px_rgba(255,255,255,0.5)]" />
      </div>

      {/* Floor threshold */}
      <div
        className="absolute bg-[#e4e1dc] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)]"
        style={{ height: 9.99, left: 0, top: 191.11, width: 112.604, zIndex: 4 }}
      />
    </div>
  )
}

// ── Inner pages ───────────────────────────────────────────────────────────────

function DesignerPage({ onBack, onAbout, onContact }: { onBack: () => void; onAbout: () => void; onContact: () => void }) {
  return <DesignerExperience onBack={onBack} onAbout={onAbout} onContact={onContact} />
}

function PhotographerPage({ onBack, onAbout, onContact }: { onBack: () => void; onAbout: () => void; onContact: () => void }) {
  const [navOpen, setNavOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [openGallery, setOpenGallery] = useState<'wildlife' | 'landscape' | null>(null)
  const [galleryPage, setGalleryPage] = useState<'wildlife' | 'landscape' | null>(null)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 40); return () => clearTimeout(t) }, [])

  const ap = '/assets'
  const images = {
    right1: `${ap}/33cd7.webp`,
    portrait: `${ap}/4ea03.webp`,
    left1: `${ap}/d931d.webp`,
    left2: `${ap}/a3fb1.webp`,
    bw: `${ap}/7455f.webp`,
    right2: `${ap}/1140d.webp`,
    right3: `${ap}/afafc.webp`,
    wildlifeThumb: `${ap}/69b16.webp`,
    landscapeThumb: `${ap}/e7d3d.webp`,
  }

  const scrollTo = (id: string) => {
    setNavOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const returnToPhotographerSection = (id: string) => {
    setNavOpen(false)
    setGalleryPage(null)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  if (galleryPage) {
    return (
      <PhotoGalleryPage
        kind={galleryPage}
        navOpen={navOpen}
        onToggleNav={() => setNavOpen((value) => !value)}
        onBack={() => setGalleryPage(null)}
        onAbout={onAbout}
        onContact={onContact}
        onNavigate={returnToPhotographerSection}
      />
    )
  }

  return (
    <div className={`photographer ${visible ? 'photographer-visible' : ''}`}>
      <PhotoNav
        open={navOpen}
        onToggle={() => setNavOpen((value) => !value)}
        onBack={onBack}
        onAbout={onAbout}
        onContact={onContact}
        onNavigate={scrollTo}
      />

      <section className="photo-hero" id="photo-top">
        <div className="photo-display-title">LOOK CLOSER</div>
        <div className="photo-portrait"><img src={images.portrait} alt="Shashwat Shaurya" loading="eager" fetchPriority="high" decoding="async" /></div>
        <div className="photo-card photo-card-left-1"><img src={images.left1} alt="A bird floating on water" loading="lazy" fetchPriority="low" decoding="async" /></div>
        <div className="photo-card photo-card-left-2"><img src={images.left2} alt="A bird with vivid red markings" loading="lazy" fetchPriority="low" decoding="async" /></div>
        <div className="photo-card photo-card-center"><img src={images.bw} alt="Birds in black and white" loading="lazy" fetchPriority="low" decoding="async" /></div>
        <div className="photo-card photo-card-right-1"><img src={images.right3} alt="An owl looking through a tree hollow" loading="lazy" fetchPriority="low" decoding="async" /></div>
        <div className="photo-card photo-card-right-2"><img src={images.right2} alt="A bird beside the water" loading="lazy" fetchPriority="low" decoding="async" /></div>
        <div className="photo-card photo-card-right-3"><img src={images.right1} alt="An orange bird perched on a branch" loading="lazy" fetchPriority="low" decoding="async" /></div>
      </section>

      <section className="photo-info" id="about">
        <div className="photo-about-grid">
          <div className="photo-about-heading">
            <img className="photo-diagonal-arrow" src="/assets/1be66.svg" alt="" />
            <div>Finding Stories<br />in the Nature</div>
          </div>
          <div className="photo-copy">
            <div className="photo-meta-grid">
              <div className="photo-meta-item">
                <p className="photo-label">Genre</p>
                <p>Wildlife &amp; Nature Photography</p>
              </div>
              <div className="photo-meta-item">
                <p className="photo-label">Focus</p>
                <p>
                  Wildlife Photography<br />
                  Nature &amp; Landscape<br />
                  Visual Storytelling
                </p>
              </div>
              <div className="photo-meta-item">
                <p className="photo-label">Based in</p>
                <p>Bangalore, India</p>
              </div>
            </div>
            <div className="photo-description">
              <p className="photo-label">Description</p>
              <p>
                My photography is driven by a fascination with wildlife and the small moments that often go unnoticed. From a bird settling onto a branch to the brief interaction between animals, I look for moments that reveal something about life in the wild.
              </p>
              <p>
                For me, wildlife photography is as much about observing as it is about photographing. It means waiting, watching, and learning to anticipate a moment before it disappears. Through my photographs, I try to preserve those fleeting encounters and tell stories of the natural world as I experience them.
              </p>
            </div>
          </div>
        </div>
        <div className="photo-gallery-index" id="work">
          <div className="photo-gallery-heading">Gallery</div>
          <GalleryRow
            title="Wildlife"
            description="A collection of moments from the wild - birds, animals, and the quiet details of life found in nature."
            image={images.wildlifeThumb}
            open={openGallery === 'wildlife'}
            onToggle={() => setOpenGallery(openGallery === 'wildlife' ? null : 'wildlife')}
            onOpen={() => setGalleryPage('wildlife')}
          />
          <GalleryRow
            title="Landscape"
            description="Quiet places, changing skies, and layers of land - landscapes captured in their simplest and most natural form."
            image={images.landscapeThumb}
            open={openGallery === 'landscape'}
            onToggle={() => setOpenGallery(openGallery === 'landscape' ? null : 'landscape')}
            onOpen={() => setGalleryPage('landscape')}
          />
        </div>
      </section>
      <PortfolioFooter onAbout={onAbout} onContact={onContact} />
    </div>
  )
}

function PhotoNav({
  open,
  onToggle,
  onBack,
  onAbout,
  onContact,
  onNavigate,
}: {
  open: boolean
  onToggle: () => void
  onBack: () => void
  onAbout: () => void
  onContact: () => void
  onNavigate: (id: string) => void
}) {
  const closeThen = (action: () => void) => {
    if (open) onToggle()
    action()
  }

  return (
    <nav className="photo-nav" aria-label="Photographer navigation">
      <div className="photo-nav-main">
        <span>Shashwat.</span>
        <button type="button" onClick={onToggle} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
          <span className={`nav-toggle-icon${open ? ' nav-toggle-icon-open' : ''}`} aria-hidden="true"><span /><span /><span /></span>
        </button>
      </div>
      <div className={`photo-nav-menu ${open ? 'photo-nav-menu-open' : ''}`}>
        <button type="button" onClick={() => closeThen(() => onNavigate('work'))}>Gallery</button>
        <button type="button" onClick={() => closeThen(onAbout)}>About</button>
        <button type="button" onClick={() => closeThen(onContact)}>Contact</button>
        <span className="photo-nav-separator" />
        <button type="button" onClick={() => closeThen(onBack)}>← Back</button>
      </div>
    </nav>
  )
}

const wildlifeGalleryAssets = {
  owl: '/assets/afafc.webp',
  pitta: '/assets/c48e8.webp',
  flock: '/assets/3beff.webp',
  deer: '/assets/29833.webp',
  shorebird: '/assets/fd5ac.webp',
  eagle: '/assets/a353d.webp',
  nest: '/assets/45afe.webp',
  crab: '/assets/01c93.webp',
  raptor: '/assets/3cee7.webp',
  monarch: '/assets/c3194.webp',
  longTailedJacana: '/assets/long-tailed-jacana.webp',
  birds: '/assets/3f01b.webp',
  kite: '/assets/eb554.webp',
  blackKite: '/assets/51f92.webp',
  monochrome: '/assets/7455f.webp',
  pochard: '/assets/8a1d0.webp',
  jacana: '/assets/16699.webp',
  flamingo: '/assets/4153d.webp',
  harrier: '/assets/410a6.webp',
  canopy: '/assets/001d3.webp',
  leafBird: '/assets/02ade.webp',
  gulls: '/assets/12532.webp',
  gull: '/assets/d931d.webp',
  bulbul: '/assets/8cb07.webp',
  flight: '/assets/83cfc.webp',
}

const landscapeGalleryAssets = [
  '/assets/e855a.webp',
  '/assets/b8606.webp',
  '/assets/6fd75.webp',
  '/assets/a7984.webp',
  '/assets/126c5.webp',
  '/assets/b55d9.webp',
  '/assets/65109.webp',
  '/assets/d618b.webp',
  '/assets/3a857.webp',
]

function PhotoGalleryPage({
  kind,
  navOpen,
  onToggleNav,
  onBack,
  onAbout,
  onContact,
  onNavigate,
}: {
  kind: 'wildlife' | 'landscape'
  navOpen: boolean
  onToggleNav: () => void
  onBack: () => void
  onAbout: () => void
  onContact: () => void
  onNavigate: (id: string) => void
}) {
  const wildlife = kind === 'wildlife'

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [kind])

  return (
    <div className={`photo-gallery-page ${wildlife ? 'wildlife-gallery-page' : 'landscape-gallery-page'}`}>
      <PhotoNav open={navOpen} onToggle={onToggleNav} onBack={onBack} onAbout={onAbout} onContact={onContact} onNavigate={onNavigate} />
      {wildlife ? (
        <>
          <GalleryIntro title="Wildlife Gallery" />
          <div className="wildlife-gallery-layout">
            <div className="wildlife-opening-grid">
              <div className="wildlife-opening-left">
                <GalleryImage src={wildlifeGalleryAssets.owl} className="wildlife-owl" />
                <GalleryImage src={wildlifeGalleryAssets.pitta} />
                <GalleryImage src={wildlifeGalleryAssets.eagle} />
                <GalleryImage src={wildlifeGalleryAssets.crab} />
              </div>
              <div className="wildlife-opening-right">
                <GalleryImage src={wildlifeGalleryAssets.flock} className="wildlife-flock" />
                <GalleryImage src={wildlifeGalleryAssets.deer} />
                <GalleryImage src={wildlifeGalleryAssets.nest} className="wildlife-nest" />
              </div>
            </div>
            <div className="wildlife-pair wildlife-pair-shore">
              <GalleryImage src={wildlifeGalleryAssets.shorebird} className="wildlife-shorebird" />
              <GalleryImage src={wildlifeGalleryAssets.raptor} />
            </div>
            <GalleryImage src={wildlifeGalleryAssets.monarch} className="wildlife-full wildlife-monarch" />
            <div className="wildlife-pair wildlife-pair-birds">
              <GalleryImage src={wildlifeGalleryAssets.longTailedJacana} />
              <GalleryImage src={wildlifeGalleryAssets.birds} className="wildlife-birds" />
            </div>
            <div className="wildlife-pair wildlife-pair-kites">
              <GalleryImage src={wildlifeGalleryAssets.kite} />
              <GalleryImage src={wildlifeGalleryAssets.blackKite} className="wildlife-black-kite" />
            </div>
            <GalleryImage src={wildlifeGalleryAssets.monochrome} className="wildlife-full wildlife-monochrome" />
            <div className="wildlife-pair wildlife-pair-water">
              <GalleryImage src={wildlifeGalleryAssets.pochard} />
              <GalleryImage src={wildlifeGalleryAssets.jacana} />
            </div>
            <GalleryImage src={wildlifeGalleryAssets.flamingo} className="wildlife-full wildlife-flamingo" />
            <div className="wildlife-pair wildlife-pair-canopy">
              <GalleryImage src={wildlifeGalleryAssets.harrier} className="wildlife-harrier" />
              <GalleryImage src={wildlifeGalleryAssets.canopy} />
            </div>
            <GalleryImage src={wildlifeGalleryAssets.leafBird} className="wildlife-full wildlife-leaf-bird" />
            <div className="wildlife-pair wildlife-pair-gulls">
              <GalleryImage src={wildlifeGalleryAssets.gulls} />
              <GalleryImage src={wildlifeGalleryAssets.gull} />
            </div>
            <GalleryImage src={wildlifeGalleryAssets.bulbul} className="wildlife-full wildlife-bulbul" />
            <GalleryImage src={wildlifeGalleryAssets.flight} className="wildlife-full wildlife-flight" />
          </div>
        </>
      ) : (
        <div className="landscape-gallery-stage">
          <div className="landscape-gallery-grid">
            {landscapeGalleryAssets.map((src, index) => (
              <GalleryImage src={src} className={`landscape-image landscape-image-${index + 1}`} key={src} />
            ))}
          </div>
          <GalleryIntro title="Landscape Gallery" />
        </div>
      )}
    </div>
  )
}

function GalleryIntro({ title }: { title: string }) {
  return (
    <div className="photo-gallery-intro">
      <div className="photo-gallery-title">{title}</div>
      <p>My photography gears</p>
      <p>Nikon D5600 | Nikon 200-500 | Nikon 70-300 | Nikon 18-55 | Digitek DTR 520 BH</p>
    </div>
  )
}

function GalleryImage({ src, className = '' }: { src: string; className?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <>
      <button className={`gallery-image ${className}`} type="button" onClick={() => setOpen(true)} aria-label="Open image full size">
        <img src={src} alt="" loading="lazy" fetchPriority="low" decoding="async" />
      </button>
      {open && createPortal(
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Full-screen photograph" onClick={() => setOpen(false)}>
          <button className="gallery-lightbox-close" type="button" onClick={() => setOpen(false)} aria-label="Close full-screen image">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <img src={src} alt="" decoding="async" onClick={(event) => event.stopPropagation()} />
        </div>,
        document.body,
      )}
    </>
  )
}

function GalleryRow({
  title,
  description,
  image,
  open,
  onToggle,
  onOpen,
}: {
  title: string
  description: string
  image: string
  open: boolean
  onToggle: () => void
  onOpen: () => void
}) {
  return (
    <div className={`photo-gallery-row ${open ? 'photo-gallery-row-open' : ''}`}>
      <button className="photo-gallery-row-toggle" type="button" onClick={onToggle} aria-expanded={open}>
        <span>{title}</span>
        {open ? <img src="/assets/29e27.svg" alt="" /> : <span aria-hidden>=</span>}
      </button>
      <div className="photo-gallery-row-content">
        <button className="photo-gallery-preview" type="button" onClick={onOpen} aria-label={`Open ${title} gallery`}>
          <img src={image} alt="" loading="lazy" fetchPriority="low" decoding="async" />
        </button>
        <p>{description}</p>
      </div>
    </div>
  )
}

// ── Reduced-motion detection ──────────────────────────────────────────────────

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const h = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return reduced
}

// ── Cinematic transition overlay ──────────────────────────────────────────────

type CinemaPhase = 'idle' | 'push' | 'loading' | 'exit'

function CinemaOverlay({
  phase,
  target,
}: {
  phase: CinemaPhase
  target: 'designer' | 'photographer' | null
}) {
  const [panelIn, setPanelIn] = useState(false)
  const [textIn, setTextIn] = useState(false)
  const [textOut, setTextOut] = useState(false)
  const [slideUp, setSlideUp] = useState(false)

  useEffect(() => {
    if (phase === 'push') {
      setPanelIn(false); setTextIn(false); setTextOut(false); setSlideUp(false)
      const id = requestAnimationFrame(() => setPanelIn(true))
      return () => cancelAnimationFrame(id)
    }
    if (phase === 'loading') {
      const t = setTimeout(() => setTextIn(true), 120)
      return () => clearTimeout(t)
    }
    if (phase === 'exit') {
      setTextOut(true)
      const id = requestAnimationFrame(() => setSlideUp(true))
      return () => cancelAnimationFrame(id)
    }
    if (phase === 'idle') {
      setPanelIn(false); setTextIn(false); setTextOut(false); setSlideUp(false)
    }
  }, [phase])

  if (phase === 'idle') return null

  const sentence = target === 'designer'
    ? 'Ideas take shape here.'
    : 'Moments become stories here.'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 198,
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: panelIn ? 1 : 0,
        transform: slideUp ? 'translateY(-100%)' : 'translateY(0)',
        transition: [
          'opacity 0.38s ease',
          `transform ${slideUp ? '1.4s cubic-bezier(0.45, 0, 0.55, 1)' : '0s'}`,
        ].join(', '),
      }}
    >
      <p
        style={{
          fontFamily: "'Inter:Regular', Inter, sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
          lineHeight: 1.5,
          color: '#1a1a1a',
          textAlign: 'center',
          maxWidth: '60vw',
          letterSpacing: '0',
          opacity: textIn && !textOut ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(8px)',
          transition: textOut
            ? 'opacity 0.2s ease'
            : 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {sentence}
      </p>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [aboutReturnPage, setAboutReturnPage] = useState<Page>('home')
  const [contactReturnPage, setContactReturnPage] = useState<Page>('home')
  const [loaderState, setLoaderState] = useState<'loading' | 'leaving' | 'done'>('loading')
  const [homeVisible, setHomeVisible] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  // Cinema transition state
  const [cinemaPhase, setCinemaPhase] = useState<CinemaPhase>('idle')
  const [cinemaTarget, setCinemaTarget] = useState<'designer' | 'photographer' | null>(null)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLoaderState('leaving'), 280)
    const doneTimer = window.setTimeout(() => setLoaderState('done'), 500)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  // Called immediately on door click — just saves target; no overlay yet
  const startCinema = (target: 'designer' | 'photographer') => {
    if (prefersReducedMotion) return
    setCinemaTarget(target)
  }

  // Called after door swing completes (1050 ms) — drives the full white-panel sequence
  const goTo = (target: 'designer' | 'photographer') => {
    if (prefersReducedMotion) {
      setTransitioning(true)
      setTimeout(() => setHomeVisible(false), 350)
      setTimeout(() => { setPage(target); setTransitioning(false) }, 650)
      return
    }
    setCinemaTarget(target)
    setCinemaPhase('push')                                          // white panel fades in
    setTimeout(() => setCinemaPhase('loading'), 350)               // text fades in
    setTimeout(() => setPage(target), 700)                         // destination renders beneath
    setTimeout(() => setCinemaPhase('exit'), 2000)                 // panel slides up (1400ms)
    setTimeout(() => { setCinemaPhase('idle'); setCinemaTarget(null) }, 3600) // clean up
  }

  const goHome = () => { setPage('home'); setHomeVisible(true) }
  const openAbout = () => { setAboutReturnPage(page); setPage('about') }
  const closeAbout = () => setPage(aboutReturnPage)
  const openContact = () => { setContactReturnPage(page); setPage('contact') }
  const closeContact = () => setPage(contactReturnPage)

  const overlay = <CinemaOverlay phase={cinemaPhase} target={cinemaTarget} />
  const personalGuide = cinemaPhase === 'idle' ? <PersonalGuide /> : null

  if (page === 'designer') return <><DesignerPage onBack={goHome} onAbout={openAbout} onContact={openContact} />{personalGuide}{overlay}</>
  if (page === 'photographer') return <><PhotographerPage onBack={goHome} onAbout={openAbout} onContact={openContact} />{personalGuide}{overlay}</>
  if (page === 'about') return <><AboutPage onBack={closeAbout} />{personalGuide}</>
  if (page === 'contact') return <><ContactPage onBack={closeContact} />{personalGuide}</>

  const pageFade: React.CSSProperties = {
    opacity: homeVisible && !transitioning ? 1 : 0,
    transition: 'opacity 0.45s ease',
  }

  // ── MOBILE ─────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <div
          className="home-screen home-screen-mobile bg-[#f2f0ec] relative shrink-0"
          style={{ width: '100%', fontFamily: "'Inter:Regular', Inter, sans-serif", ...pageFade }}
        >
          <div className="home-mobile-stage">
            <div className="home-mobile-doors">
              <div className="home-mobile-door-group">
                <div className="home-mobile-door-label"><span>01</span><strong>DESIGN</strong></div>
                <MobileDoor side="designer" onEnter={() => goTo('designer')} onStart={() => startCinema('designer')} />
              </div>
              <div className="home-mobile-door-group">
                <div className="home-mobile-door-label"><span>02</span><strong>PHOTOGRAPHER</strong></div>
                <MobileDoor side="photographer" onEnter={() => goTo('photographer')} onStart={() => startCinema('photographer')} />
              </div>
            </div>

            <div className="home-mobile-prompt">
              <p className="home-mobile-question">What are you here to see?</p>
              <p className="home-mobile-hint">Choose a path.</p>
              <span className="home-mobile-divider" />
              <p className="home-mobile-tagline">TWO WAYS OF MAKING. ONE WAY OF SEEING.</p>
            </div>

            <p className="home-mobile-location">BANGALORE, INDIA</p>
          </div>
        </div>
        {personalGuide}
        {overlay}
        {loaderState !== 'done' && <InitialLoader leaving={loaderState === 'leaving'} />}
      </>
    )
  }

  // ── DESKTOP ─────────────────────────────────────────────────────────────────
  return (
    <>
    <div
      className="home-screen home-screen-desktop relative bg-[#f2f0ec]"
      style={{ fontFamily: "'Inter:Regular', Inter, sans-serif", ...pageFade }}
    >
      {/* Labels row — absolute top-[196px], flex 3-col matching main */}
      <div className="absolute left-0 right-0 flex" style={{ top: 'clamp(112px, 18svh, 196px)' }}>
        {/* Left label column */}
        <div className="flex-1 flex justify-end" style={{ paddingRight: 40, paddingLeft: 24 }}>
          <div className="flex flex-col items-center" style={{ paddingTop: 8, width: 259.998 }}>
            <p className="font-light text-[#bbb] text-[9px] text-center tracking-[3.6px] uppercase whitespace-nowrap leading-[13.5px]" style={{ fontFamily: "'Inter:Light', Inter, sans-serif" }}>
              01
            </p>
            <p className="font-medium text-[#1a1a1a] text-[20px] text-center tracking-[3.84px] uppercase whitespace-nowrap leading-[18px] mt-[4px]" style={{ fontFamily: "'Inter:Medium', Inter, sans-serif" }}>
              Designer
            </p>
            <p className="font-light text-[#aaa] text-[16px] text-center whitespace-nowrap leading-[15px] mt-[6px]" style={{ fontFamily: "'Inter:Light', Inter, sans-serif" }}>
              Observe. Design. Solve.
            </p>
          </div>
        </div>

        {/* Center placeholder (matches center block width) */}
        <div style={{ flexShrink: 0, width: 399.994 }} />

        {/* Right label column */}
        <div className="flex-1 flex justify-start" style={{ paddingLeft: 40, paddingRight: 24 }}>
          <div className="flex flex-col items-center" style={{ paddingTop: 8, width: 259.998 }}>
            <p className="font-light text-[#bbb] text-[9px] text-center tracking-[3.6px] uppercase whitespace-nowrap leading-[13.5px]" style={{ fontFamily: "'Inter:Light', Inter, sans-serif" }}>
              02
            </p>
            <p className="font-medium text-[#1a1a1a] text-[20px] text-center tracking-[3.84px] uppercase whitespace-nowrap leading-[18px] mt-[4px]" style={{ fontFamily: "'Inter:Medium', Inter, sans-serif" }}>
              Photographer
            </p>
            <p className="font-light text-[#aaa] text-[16px] text-center whitespace-nowrap leading-[15px] mt-[6px]" style={{ fontFamily: "'Inter:Light', Inter, sans-serif" }}>
              Wildlife &amp; Nature
            </p>
          </div>
        </div>
      </div>

      {/* Main content — absolute top-[315px], flex 3-col */}
      <div className="home-desktop-stage absolute left-0 right-0 flex items-start" style={{ top: 'clamp(200px, calc(100svh - 500px), 315px)' }}>

        {/* Left door column */}
        <div className="flex-1 flex justify-end" style={{ paddingRight: 40, paddingLeft: 24 }}>
          <DesktopDoor side="designer" onEnter={() => goTo('designer')} onStart={() => startCinema('designer')} />
        </div>

        {/* Center content — sits 99px below door top (Figma: top-[99px]) */}
        <div
          className="flex flex-col items-center"
          style={{ flexShrink: 0, marginTop: 99, paddingLeft: 16, paddingRight: 16, width: 399.994 }}
        >
          {/* Heading */}
          <div className="flex flex-col items-center pb-[16px] shrink-0" style={{ width: 265 }}>
            <div
              className="font-normal text-[#1a1a1a] text-center whitespace-nowrap shrink-0"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 46.075, letterSpacing: -0.4607, lineHeight: 0 }}
            >
              <p style={{ lineHeight: '52.986px', marginBottom: 0 }}>What are you</p>
              <p style={{ lineHeight: '52.986px' }}>here to see?</p>
            </div>
          </div>

          {/* Choose a path */}
          <div className="flex flex-col items-center pb-[24px] shrink-0">
            <p
              className="font-light text-[#767676] text-[12.8px] text-center tracking-[0.384px] whitespace-nowrap leading-[19.2px]"
              style={{ fontFamily: "'Inter:Light', Inter, sans-serif" }}
            >
              Choose a path.
            </p>
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center pb-[24px] shrink-0">
            <div className="bg-[#d0ccc6] shrink-0" style={{ height: 1, width: 27.989 }} />
          </div>

          {/* Tagline takes the place of the removed arrow buttons */}
          <div className="flex flex-col items-center shrink-0">
            <p
              className="font-light text-[#767676] text-[10px] text-center tracking-[2.4px] uppercase whitespace-nowrap leading-[12px]"
              style={{ fontFamily: "'Inter:Light', Inter, sans-serif" }}
            >
              Two ways of making. One way of seeing.
            </p>
          </div>
        </div>

        {/* Right door column */}
        <div className="flex-1 flex justify-start" style={{ paddingLeft: 40, paddingRight: 24 }}>
          <DesktopDoor side="photographer" onEnter={() => goTo('photographer')} onStart={() => startCinema('photographer')} />
        </div>
      </div>
    </div>
    {personalGuide}
    {overlay}
    {loaderState !== 'done' && <InitialLoader leaving={loaderState === 'leaving'} />}
    </>
  )
}
