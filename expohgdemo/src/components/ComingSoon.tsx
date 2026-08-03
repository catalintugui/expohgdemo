import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const IMAGES = [
  '/coming-soon/01.jpg',
  '/coming-soon/02.jpg',
  '/coming-soon/03.jpg',
  '/coming-soon/04.jpg',
  '/coming-soon/05.jpg',
  '/coming-soon/06.jpg',
  '/coming-soon/07.jpg',
  '/coming-soon/08.jpg',
  '/coming-soon/09.jpg',
]

const FLASH_MS = 180
const WALL_REPEAT = 800
const PHRASE =
  'Arhiva Haralamb H. (Bubi) Georgescu • În curând • Harlan H. (Bubi) Georgesco Archive • Coming Soon •'

function snapWall(band: HTMLElement) {
  const wallEl = band.querySelector<HTMLElement>('.coming-soon__wall')
  if (!wallEl) return

  wallEl.style.lineHeight = ''
  wallEl.style.maxHeight = ''
  wallEl.style.visibility = ''

  const fontSize = parseFloat(getComputedStyle(wallEl).fontSize)
  if (!Number.isFinite(fontSize) || fontSize <= 0) return

  const lineHeight = Math.max(1, Math.round(fontSize * 1.2))
  wallEl.style.lineHeight = `${lineHeight}px`

  // Whole lines only, hard clip — no ellipsis.
  const lines = Math.max(0, Math.floor(band.clientHeight / lineHeight))
  if (lines === 0) {
    wallEl.style.visibility = 'hidden'
    wallEl.style.maxHeight = '0px'
    return
  }

  wallEl.style.maxHeight = `${lines * lineHeight}px`
}

export function ComingSoon() {
  const [index, setIndex] = useState(0)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const wall = Array.from({ length: WALL_REPEAT }, () => PHRASE).join(' ')

  useLayoutEffect(() => {
    const bands = [topRef.current, bottomRef.current].filter(
      (el): el is HTMLDivElement => Boolean(el),
    )
    if (!bands.length) return

    const sync = () => {
      for (const band of bands) snapWall(band)
    }

    sync()
    const ro = new ResizeObserver(sync)
    for (const band of bands) ro.observe(band)
    document.fonts?.ready?.then(sync)
    window.addEventListener('resize', sync)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % IMAGES.length)
    }, FLASH_MS)

    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="coming-soon" aria-label="Coming Soon">
      <h2 className="visually-hidden">{PHRASE}</h2>
      <div className="container coming-soon__inner">
        <div
          className="coming-soon__band coming-soon__band--top"
          ref={topRef}
        >
          <p className="coming-soon__wall" aria-hidden="true">
            {wall}
          </p>
        </div>

        <div className="coming-soon__window" aria-hidden="true">
          {IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={i === index ? 'is-active' : undefined}
              draggable={false}
            />
          ))}
        </div>

        <div
          className="coming-soon__band coming-soon__band--bottom"
          ref={bottomRef}
        >
          <p className="coming-soon__wall" aria-hidden="true">
            {wall}
          </p>
        </div>
      </div>
    </section>
  )
}
