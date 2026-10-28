import { useTranslation } from '../i18n/I18nContext'

const ALT =
  'Poster expoziție Bubi — grilă geometrică Bauhaus și parteneri: OAR, Timbrul Arhitecturii, UAR, UAUIM, SAC'

export function ComingSoon() {
  const { t } = useTranslation()
  const page = t.homePage

  return (
    <section className="coming-soon" aria-label={page.posterAria}>
      <h2 className="visually-hidden">{page.posterHeading}</h2>
      <div className="coming-soon__poster">
        <picture>
          <source
            media="(min-width: 48rem)"
            type="image/webp"
            srcSet="/poster-landscape.webp"
          />
          <img src="/poster.webp" alt={ALT} draggable={false} />
        </picture>
      </div>
    </section>
  )
}
