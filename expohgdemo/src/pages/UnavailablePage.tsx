import { useTranslation } from '../i18n/I18nContext'

export function UnavailablePage() {
  const { t } = useTranslation()

  return (
    <section className="unavailable" aria-live="polite">
      <p className="unavailable__message">{t.unavailable.message}</p>
    </section>
  )
}
