export default function PortfolioFooter({ onAbout, onContact }: { onAbout: () => void; onContact: () => void }) {
  return (
    <footer className="designer-footer" id="designer-contact">
      <img className="designer-footer-background" src="/assets/footer-city.png" alt="" loading="lazy" decoding="async" />
      <a className="designer-footer-email" href="https://mail.google.com/mail/?view=cm&fs=1&to=shashwat.shaurya2005@gmail.com" target="_blank" rel="noreferrer">
        <span className="designer-footer-email-label">shashwat.shaurya2005@gmail.com</span>
      </a>
      <img className="designer-footer-character" src="/assets/footer-character.png" alt="" loading="lazy" decoding="async" />
      <nav className="designer-footer-links" aria-label="Footer navigation">
        <button type="button" onClick={onAbout}>About</button>
        <button type="button" onClick={onContact}>Let’s Talk</button>
        <a href="https://www.instagram.com/shashwatshauryyyaaa/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/in/shashwat-shaurya/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://www.behance.net/shashwatshaurya" target="_blank" rel="noreferrer">Behance</a>
      </nav>
    </footer>
  )
}
