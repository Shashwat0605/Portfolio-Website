export default function PortfolioFooter({ onAbout, onContact }: { onAbout: () => void; onContact: () => void }) {
  return (
    <footer className="designer-footer" id="designer-contact">
      <img src="/assets/designer/relaxing-under-foliage.png" alt="" />
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shashwat.shaurya2005@gmail.com" target="_blank" rel="noreferrer">
        shashwat.shaurya2005@gmail.com
      </a>
      <div>
        <button type="button" onClick={onAbout}>About</button>
        <button type="button" onClick={onContact}>Let’s Talk</button>
        <a href="https://www.instagram.com/shashwatshauryyyaaa/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/in/shashwat-shaurya/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://www.behance.net/shashwatshaurya" target="_blank" rel="noreferrer">Behance</a>
      </div>
    </footer>
  )
}
