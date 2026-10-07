import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <section className="not-found" aria-labelledby="not-found-heading">
      <p className="not-found__code" id="not-found-heading" aria-hidden="true">
        404
      </p>
      <p className="not-found__message">{t.notFound.message}</p>
      <Link to="/" className="not-found__link">
        {t.notFound.homeLink}
      </Link>
    </section>
  )
}
