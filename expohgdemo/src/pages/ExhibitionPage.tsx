import { BauhausAccent } from '../components/BauhausAccent'
import { useTranslation } from '../i18n/I18nContext'

export function ExhibitionPage() {
  const { t } = useTranslation()
  const { exhibition: expo, exhibitionPage: page } = t

  return (
    <>
      <section className="hero page-section">
        <div className="container hero__grid">
          <div>
            <BauhausAccent />
            <h2>{page.heading}</h2>
            <div className="hero__meta">
              <span>{expo.dates}</span>
              <span>{expo.venue}</span>
            </div>
          </div>
          <p className="hero__lead">{page.lead}</p>
        </div>
      </section>

      <section className="statement page-section">
        <div className="container statement__inner">
          <h2>{page.statement}</h2>
          <div className="statement__text">
            {expo.statement.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="visit page-section">
        <div className="container">
          <h2>{page.visit}</h2>
          <div className="visit__grid">
            <div className="visit__block">
              <span className="label">{page.opening}</span>
              <p>
                <strong>{expo.opening}</strong>
              </p>
            </div>
            <div className="visit__block">
              <span className="label">{page.address}</span>
              <p>
                <strong>{expo.venue}</strong>
                {expo.street ? (
                  <>
                    {expo.street}
                    <br />
                  </>
                ) : null}
                {expo.city}
              </p>
            </div>
            <div className="visit__block">
              <span className="label">{page.admission}</span>
              <p>
                <strong>{expo.admission}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
