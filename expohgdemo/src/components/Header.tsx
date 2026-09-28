import { NavLink } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'
import { LanguageSelector } from './LanguageSelector'
import { WorkNavDropdown } from './WorkNavDropdown'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__top">
          <NavLink to="/" className="header__title" end>
            <h1>{t.architect.name}</h1>
            <span>{t.architect.tagline}</span>
          </NavLink>
          <LanguageSelector />
        </div>
        <nav className="nav" aria-label={t.nav.mainAria}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            {t.nav.homepage}
          </NavLink>
          <NavLink
            to="/exhibition"
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            {t.nav.exhibition}
          </NavLink>
          <WorkNavDropdown />
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            {t.nav.about}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
