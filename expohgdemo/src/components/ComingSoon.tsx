const ALT =
  'Poster expoziție Bubi — grilă geometrică Bauhaus și parteneri: OAR, Timbrul Arhitecturii, UAR, UAUIM, SAC'

export function ComingSoon() {
  return (
    <section className="coming-soon" aria-label="Expoziție Bubi">
      <h2 className="visually-hidden">
        Expoziție Haralamb H. (Bubi) Georgescu
      </h2>
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
