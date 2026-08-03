import { content } from '../content'

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__title">
          <h1>{content.architect.name}</h1>
        </a>
        <span className="header__tagline">{content.architect.tagline}</span>
      </div>
    </header>
  )
}
