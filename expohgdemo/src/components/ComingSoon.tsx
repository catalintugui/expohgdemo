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
const WALL_REPEAT = 1200
const PHRASE =
  'Arhiva Haralamb H. (Bubi) Georgescu • În curând • Harlan H. (Bubi) Georgesco Archive • Coming Soon •'

export function ComingSoon() {
  const [index, setIndex] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const wallRef = useRef<HTMLParagraphElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const wall = Array.from({ length: WALL_REPEAT }, () => PHRASE).join(' ')

  useLayoutEffect(() => {
    const stage = stageRef.current
    const wallEl = wallRef.current
    const win = windowRef.current
    if (!stage || !wallEl || !win) return

    const sync = () => {
      // Keep the window CSS-centered; only snap height + shift the text grid.
      win.style.height = ''
      wallEl.style.paddingTop = ''

      const lineHeight = parseFloat(getComputedStyle(wallEl).lineHeight)
      if (!Number.isFinite(lineHeight) || lineHeight <= 0) return

      const stageH = stage.clientHeight
      const preferredH = win.offsetHeight
      const height = Math.max(
        lineHeight,
        Math.round(preferredH / lineHeight) * lineHeight,
      )
      win.style.height = `${height}px`

      const top = (stageH - height) / 2
      const offset = top - Math.floor(top / lineHeight) * lineHeight
      wallEl.style.paddingTop = `${offset}px`
    }

    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(stage)
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
      <div className="container coming-soon__stage" ref={stageRef}>
        <p className="coming-soon__wall" ref={wallRef} aria-hidden="true">
          {wall}
        </p>
        <div className="coming-soon__window" ref={windowRef}>
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
      </div>
    </section>
  )
}
