import { useState } from 'react'

const aboutPhotos = [
  { src: '/assets/about-river.jpg', alt: 'Walking through a river in the forest' },
  { src: '/assets/about-photographer.jpg', alt: 'Photographing the mountains from a rocky overlook' },
  { src: '/assets/about-portrait-bw.jpg', alt: 'Black and white portrait on a mountain' },
  { src: '/assets/about-mist-road.png', alt: 'A motorcycle on a misty forest road' },
  { src: '/assets/about-hillside.jpg', alt: 'Sitting on a hillside above the forest' },
  { src: '/assets/about-beach.jpg', alt: 'Standing beside a surfboard at the beach' },
  { src: '/assets/about-forest-ride.jpg', alt: 'Riding a motorcycle through a green forest' },
]

export default function AboutPage({ onBack }: { onBack: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <main className="about-page">
      <button className="about-back" type="button" onClick={onBack}>← Back</button>
      <div className="about-content">
        <header className="about-heading">
          <p>What it’s like</p>
          <h1>Working with me</h1>
        </header>

        <section className="about-intro" aria-label="About Shashwat">
          <img
            className="about-illustration"
            src="/assets/about-studio-illustration.png"
            alt="Illustration of a designer and photographer working in a studio"
          />
          <a
            className="about-resume"
            href="/assets/ShashwatShaurya_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Shashwat’s resume PDF in a new tab"
          >
            Resume <img src="/assets/designer/db899.svg" alt="" />
          </a>
          <div className="about-copy">
            <p>I’ve always been someone who wants to know why? before asking how?</p>
            <p>When I come across a problem, I like to understand what’s actually happening before jumping into a solution. I ask questions, look at things from different sides, and try to understand the people behind the problem. I’d rather spend a little more time figuring that out than make something that looks good but doesn’t really help.</p>
            <p>My journey has been a mix of technology, design and art. I study Computer Science, which has taught me to think about how things work, while painting, digital art and photography have taught me to care about how things feel and look. Design became the place where these interests started coming together.</p>
            <p>Photography, especially wildlife photography, has probably influenced me the most. You can’t tell a bird to wait for the perfect shot. You have to slow down, observe and know when to take the shot. I think I carry that same patience into design.</p>
            <p>I enjoy exploring ideas, questioning my first thought, trying things out and slowly getting closer to something that feels simple and right.</p>
            <p>I’m still learning, and I think that’s the fun part.</p>
            <p>There’s always another problem to understand, another perspective to discover, and something new to make.</p>
          </div>
        </section>
      </div>

      <section className="about-photo-strip" aria-label="Photos from Shashwat’s life">
        <div className="about-photo-track">
          {[0, 1].map((copy) => (
            <div className="about-photo-group" key={copy} aria-hidden={copy === 1}>
              {aboutPhotos.map((photo, index) => {
                const photoId = `${copy}-${index}`
                return (
                  <button
                    className={`about-photo-card about-photo-card-${index + 1}${selectedPhoto === index ? ' about-photo-card-selected' : ''}`}
                    type="button"
                    key={photoId}
                    tabIndex={copy === 0 ? 0 : -1}
                    aria-label={`Enlarge photo: ${photo.alt}`}
                    aria-pressed={selectedPhoto === index}
                    onClick={() => setSelectedPhoto(selectedPhoto === index ? null : index)}
                  >
                    <img src={photo.src} alt={copy === 0 ? photo.alt : ''} loading="lazy" />
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
