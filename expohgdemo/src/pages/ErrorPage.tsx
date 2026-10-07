import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'

type ErrorPageProps = {
  onReset?: () => void
}

export function ErrorPage({ onReset }: ErrorPageProps) {
  const { t } = useTranslation()

  return (
    <section className="error-page" aria-labelledby="error-heading">
      <h2 className="visually-hidden" id="error-heading">
        {t.error.message}
      </h2>
      <p className="error-page__message">{t.error.message}</p>
      <Link
        to="/"
        className="error-page__link"
        onClick={() => {
          onReset?.()
        }}
      >
        {t.error.homeLink}
      </Link>
    </section>
  )
}
