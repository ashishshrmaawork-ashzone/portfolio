import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link href="/#home" aria-label="Ashish Sharma home">
            <img src="/assets/images/logo-footer.svg" alt="Ashish Sharma" width="225" height="48" />
          </Link>
          <p>Thoughtful digital products, built to work beautifully and grow with you.</p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">EXPLORE</span>
          <Link href="/#features">Services</Link>
          <Link href="/#portfolio">Portfolio</Link>
          <Link href="/#resume">Experience</Link>
        </div>
        <div className="footer-links">
          <span className="eyebrow">SAY HELLO</span>
          <a href="mailto:ashishshrmaa@outlook.com">ashishshrmaa@outlook.com</a>
          <a href="https://wa.me/919928686337" target="_blank" rel="noreferrer">
            WhatsApp ↗
          </a>
          <Link href="/#contacts">Start a project ↗</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ashish Sharma</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
