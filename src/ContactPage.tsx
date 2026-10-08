export default function ContactPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="contact-page">
      <img className="contact-hammock" src="/assets/contact-hammock.webp" alt="" />
      <button className="contact-back" type="button" onClick={onBack}>← Back</button>
      <div className="contact-content">
        <h1>GET IN TOUCH</h1>
        <a
          className="contact-email"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=shashwat.shaurya2005@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          shashwat.shaurya2005@gmail.com
        </a>
        <section className="contact-socials" aria-label="Social media">
          <h2>Socials</h2>
          <div>
            <a href="https://www.linkedin.com/in/shashwat-shaurya/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/shashwatshauryyyaaa/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </section>
      </div>
    </main>
  )
}
