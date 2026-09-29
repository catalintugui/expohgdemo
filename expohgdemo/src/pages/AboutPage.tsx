import { BauhausAccent } from '../components/BauhausAccent'
import { ExhibitionEventLink } from '../components/ExhibitionEventLink'
import { useTranslation } from '../i18n/I18nContext'

export function AboutPage() {
  const { t } = useTranslation()
  const page = t.aboutPage

  return (
    <>
      <section className="hero page-section">
        <div className="container hero__grid">
          <div>
            <BauhausAccent />
            <div className="hero__meta">
              <span>{page.metaRole}</span>
              <span>{page.metaYears}</span>
            </div>
          </div>
          <p className="hero__lead">{page.lead}</p>
        </div>
      </section>

      <section className="statement page-section">
        <div className="container statement__inner">
          <h2>{page.archiveHeading}</h2>
          <div className="statement__text">
            {page.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team page-section">
        <div className="container statement__inner">
          <h2>{page.organizationHeading}</h2>
          <div className="about-team__grid">
            <div className="about-team__column">
              <div className="about-team__block">
                <span className="label">{page.researchHeading}</span>
                <ul className="about-team__list">
                  <li>
                    {page.coordinatorName} — {page.coordinatorRole}
                  </li>
                </ul>
              </div>
              <div className="about-team__block">
                <span className="label">{page.teamHeading}</span>
                <ul className="about-team__list">
                  {page.team.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="about-team__block">
              <span className="label">{page.collaboratorsHeading}</span>
              <ul className="about-team__list">
                {page.collaborators.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="statement page-section">
        <div className="container statement__inner">
          <h2>{page.exhibitionHeading}</h2>
          <div className="statement__text">
            {page.exhibition.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="statement page-section statement--alt">
        <div className="container statement__inner">
          <h2>{page.fundingHeading}</h2>
          <div className="statement__text">
            {page.funding.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="visit page-section">
        <div className="container">
          <h2>{page.contactHeading}</h2>
          <div className="visit__grid visit__grid--contact">
            <div className="visit__block">
              <span className="label">{page.contactName}</span>
              <p>
                <strong>{page.emailLabel}</strong>
                <a href={`mailto:${page.email}`}>{page.email}</a>
              </p>
            </div>
            <div className="visit__block">
              <span className="label">{page.socialLabel}</span>
              <div className="about-contact__social">
                <a
                  className="about-contact__social-link"
                  href={page.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="about-contact__icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                  <span>{page.instagram}</span>
                </a>
                <a
                  className="about-contact__social-link"
                  href={page.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="about-contact__icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="currentColor"
                      d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
                    />
                  </svg>
                  <span>{page.facebook}</span>
                </a>
              </div>
            </div>
          </div>
          <ExhibitionEventLink />
        </div>
      </section>
    </>
  )
}
