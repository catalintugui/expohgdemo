import { content } from '../content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__marks" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>
          {content.common.copyright} {content.architect.name}
        </span>
        <span>{content.architect.location}</span>
      </div>
    </footer>
  )
}
