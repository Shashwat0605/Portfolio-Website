import type { CaseStudyId } from './CaseStudyPage'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import CaseStudyPage from './CaseStudyPage'
import PortfolioFooter from './PortfolioFooter'

const caseStudies = {
  'group-navigation': {
    title: 'Together, all the way',
    subtitle: 'Google Maps Feature',
    description: 'A Google Maps feature concept that helps groups travelling in multiple vehicles stay connected, understand where everyone is, and regroup when they get separated.',
    preview: '/assets/group-navigation/gmap-thumbnail.mp4',
    background: '#000000',
  },
  'paisa-pop': {
    title: 'Borrow better',
    subtitle: 'Personal Loan App for Salaried Individual',
    description: 'A UX/UI redesign for a personal loan app, simplifying a complex financial journey into a clearer and more reassuring experience for salaried users.',
    preview: '/assets/paisa-pop/paisa-pop-thumbnail.mp4',
    background: '#1b2224',
  },
  justvend: {
    title: 'Tap. Pick. Done.',
    subtitle: 'Vending Machine Application',
    description: 'A mobile app redesign that makes finding, buying, and managing vending machine products faster and easier.',
    preview: '/assets/justvend/justvend-thumbnail.mp4',
    background: '#000000',
  },
} satisfies Record<CaseStudyId, { title: string; subtitle: string; description: string; preview: string; background: string }>

export default function DesignerExperience({ onBack, onAbout, onContact }: { onBack: () => void; onAbout: () => void; onContact: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeStudy, setActiveStudy] = useState<CaseStudyId | null>(null)

  if (activeStudy) {
    return <CaseStudyPage id={activeStudy} onBack={() => setActiveStudy(null)} />
  }

  return (
    <div className="designer-page">
      <DesignerNav open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} onBack={onBack} onAbout={onAbout} onContact={onContact} />
      <section className="designer-hero">
        <img src="/assets/designer/aca45.webp" alt="" loading="eager" fetchPriority="high" decoding="async" />
        <div className="designer-frame-67">
          <img className="designer-hero-arrow" src="/assets/designer/d1bf8.svg" alt="" />
          <div className="designer-frame-67-copy">
            <p>I ALSO MAKE ILLUSTRATIONS,<br />PAINTINGS &amp;<br />PHOTOGRAPHING<br />WILDLIFE.</p>
            <a className="designer-resume" href="/assets/ShashwatShaurya_Resume.pdf" target="_blank" rel="noreferrer">Resume <img src="/assets/designer/db899.svg" alt="" /></a>
          </div>
        </div>
        <div className="designer-hero-title">
          <span>PRODUCT</span>
          <span>DESIGNER</span>
        </div>
        <p>SELF-TAUGHT, STARTED WITH WEB DEVELOPMENT AND NEVER REALLY STOPPED THINKING ABOUT THINGS.</p>
      </section>

      <section className="designer-process" id="designer-about">
        <div className="designer-section-title">Observe. Design. Solve.</div>
        <div className="designer-process-grid">
          <ProcessCard title="Understand the Problem">I explore users, context, pain points, and constraints to understand what actually needs to be solved.</ProcessCard>
          <ProcessCard title="Turn Ideas into Experiences">I move from user flows and wireframes to interactive prototypes, testing different approaches and refining what works.</ProcessCard>
          <ProcessCard title="Design with Purpose">I combine hierarchy, typography, interaction, and visual design to create interfaces that are clear, consistent, and purposeful.</ProcessCard>
          <ProcessCard title="Explore with AI">I use AI to accelerate research, organize insights, generate directions, and explore multiple ideas quickly while keeping the design decisions human-led.</ProcessCard>
          <ProcessCard title="Think Beyond Screens">I think about the users, the business, and the technology behind a product, balancing user needs, business goals, technical constraints, and feasibility to create solutions that can actually work and grow.</ProcessCard>
        </div>
      </section>

      <section className="designer-work" id="designer-work">
        <div className="designer-work-title">Explore My <span>WORK</span></div>
        <div className="designer-projects">
          {(Object.entries(caseStudies) as [CaseStudyId, (typeof caseStudies)[CaseStudyId]][]).map(([id, project]) => (
            <article className="designer-project-card" key={id} style={{ backgroundColor: project.background }}>
              <div className="designer-project-copy">
                <div>
                  <div className="designer-project-title">{project.title}</div>
                  <p>{project.subtitle}</p>
                </div>
                <div>
                  <button className="designer-project-read" type="button" onClick={() => setActiveStudy(id)}>
                    Continue reading
                  </button>
                  <p>{project.description}</p>
                </div>
              </div>
              <div className="designer-project-image">
                {project.preview.endsWith('.mp4') ? (
                  <ProjectPreviewVideo src={project.preview} label={`${project.title} preview`} />
                ) : (
                  <img src={project.preview} alt="" />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <PortfolioFooter onAbout={onAbout} onContact={onContact} />
    </div>
  )
}

function DesignerNav({ open, onToggle, onBack, onAbout, onContact }: { open: boolean; onToggle: () => void; onBack: () => void; onAbout: () => void; onContact: () => void }) {
  const navigateTo = (sectionId: string) => {
    onToggle()
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="designer-nav">
      <div><strong>Shashwat.</strong><button type="button" onClick={onToggle} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}><span className={`nav-toggle-icon${open ? ' nav-toggle-icon-open' : ''}`} aria-hidden="true"><span /><span /><span /></span></button></div>
      <div className={open ? 'designer-nav-menu designer-nav-menu-open' : 'designer-nav-menu'}>
        <button type="button" onClick={() => navigateTo('designer-work')}>Projects</button>
        <button type="button" onClick={() => { onToggle(); onAbout() }}>About</button>
        <button type="button" onClick={() => { onToggle(); onContact() }}>Contact</button>
        <span className="designer-nav-separator" aria-hidden="true" />
        <button className="designer-nav-back" type="button" onClick={() => { onToggle(); onBack() }}>← Back</button>
      </div>
    </nav>
  )
}

function ProcessCard({ title, children }: { title: string; children: ReactNode }) {
  return <article><strong>{title}</strong><p>{children}</p></article>
}

function ProjectPreviewVideo({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [nearViewport, setNearViewport] = useState(false)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!('IntersectionObserver' in window)) {
      setNearViewport(true)
      setHasEnteredViewport(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setNearViewport(entry.isIntersecting)
      if (entry.isIntersecting) setHasEnteredViewport(true)
    }, { rootMargin: '240px 0px' })

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (nearViewport) void video.play().catch(() => {})
    else video.pause()
  }, [nearViewport, hasEnteredViewport])

  return (
    <video
      ref={videoRef}
      src={hasEnteredViewport ? src : undefined}
      preload={hasEnteredViewport ? 'metadata' : 'none'}
      autoPlay={nearViewport}
      muted
      loop
      playsInline
      aria-label={label}
    />
  )
}
