import { useEffect } from 'react'

export type CaseStudyId = 'group-navigation' | 'justvend' | 'paisa-pop'

const caseStudyScreenshots: Record<CaseStudyId, { src: string; alt: string }> = {
  'group-navigation': {
    src: '/assets/case-studies/group-navigation.jpg',
    alt: 'Group Navigation case study: Together, Even When Apart — Making Group Journeys Feel Connected',
  },
  justvend: {
    src: '/assets/case-studies/justvend.jpg',
    alt: 'JustVend product design case study',
  },
  'paisa-pop': {
    src: '/assets/case-studies/paisa-pop.jpg',
    alt: 'Paisa Pop personal loan app case study',
  },
}

export default function CaseStudyPage({ id, onBack }: { id: CaseStudyId; onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const image = caseStudyScreenshots[id]

  return (
    <main className="case-study case-study-image-page">
      <button className="about-back" type="button" onClick={onBack}>← Back</button>
      <img className="case-study-screenshot" src={image.src} alt={image.alt} />
    </main>
  )
}
