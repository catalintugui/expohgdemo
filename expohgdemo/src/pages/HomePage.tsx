import { ComingSoon } from '../components/ComingSoon'
import { usePageMeta } from '../hooks/usePageMeta'
import { useTranslation } from '../i18n/I18nContext'

export function HomePage() {
  const { t } = useTranslation()

  usePageMeta({
    title: t.meta.title,
    description: t.meta.description,
    path: '/',
  })

  return <ComingSoon />
}
