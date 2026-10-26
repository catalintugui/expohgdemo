import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type ProjectSliderProps = {
  images: string[]
  title: string
  placeholderLabel: string
  prevLabel: string
  nextLabel: string
  closeLabel: string
}

export function ProjectSlider({
  images,
  title,
  placeholderLabel,
  prevLabel,
  nextLabel,
  closeLabel,
}: ProjectSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)
  const isFullscreen = fullscreenIndex !== null

  function scrollBy(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector<HTMLElement>('.project-slider__slide')
    if (!slide) return
    const gap = parseFloat(getComputedStyle(track).gap) || 0
    track.scrollBy({
      left: direction * (slide.offsetWidth + gap),
      behavior: 'smooth',
    })
  }

  function stepFullscreen(direction: -1 | 1) {
    if (fullscreenIndex === null || images.length === 0) return
    const next = (fullscreenIndex + direction + images.length) % images.length
    setFullscreenIndex(next)
  }

  useEffect(() => {
    if (!isFullscreen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setFullscreenIndex(null)
        return
      }

      if (images.length === 0) return

      if (event.key === 'ArrowLeft') {
        setFullscreenIndex((current) =>
          current === null ? current : (current - 1 + images.length) % images.length,
        )
      } else if (event.key === 'ArrowRight') {
        setFullscreenIndex((current) =>
          current === null ? current : (current + 1) % images.length,
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isFullscreen, images.length])

  const fullscreenSrc =
    fullscreenIndex !== null ? images[fullscreenIndex] : null

  return (
    <div className="project-slider">
      <div className="project-slider__controls">
        <button
          type="button"
          className="project-slider__btn"
          onClick={() => scrollBy(-1)}
          aria-label={prevLabel}
        >
          ←
        </button>
        <button
          type="button"
          className="project-slider__btn"
          onClick={() => scrollBy(1)}
          aria-label={nextLabel}
        >
          →
        </button>
      </div>

      <div ref={trackRef} className="project-slider__track">
        {images.map((src, index) => (
          <div key={`${src || 'placeholder'}-${index}`} className="project-slider__slide">
            {src ? (
              <button
                type="button"
                className="project-slider__open"
                onClick={() => setFullscreenIndex(index)}
                aria-label={`${title} — ${index + 1}`}
              >
                <img src={src} alt={`${title} — ${index + 1}`} loading="lazy" />
              </button>
            ) : (
              <div
                className="project-slider__placeholder"
                role="img"
                aria-label={`${placeholderLabel} ${title} ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>

      {isFullscreen
        ? createPortal(
            <div
              className="project-slider-fs"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              onClick={() => setFullscreenIndex(null)}
            >
              <button
                type="button"
                className="project-slider-fs__close"
                onClick={() => setFullscreenIndex(null)}
                aria-label={closeLabel}
              >
                ×
              </button>

              <button
                type="button"
                className="project-slider-fs__nav project-slider-fs__nav--prev"
                onClick={(event) => {
                  event.stopPropagation()
                  stepFullscreen(-1)
                }}
                aria-label={prevLabel}
              >
                ←
              </button>

              <div
                className="project-slider-fs__stage"
                onClick={(event) => event.stopPropagation()}
              >
                {fullscreenSrc ? (
                  <img
                    className="project-slider-fs__image"
                    src={fullscreenSrc}
                    alt={`${title} — ${(fullscreenIndex ?? 0) + 1}`}
                  />
                ) : (
                  <div
                    className="project-slider-fs__placeholder"
                    role="img"
                    aria-label={`${placeholderLabel} ${title}`}
                  />
                )}
                <p className="project-slider-fs__count">
                  {(fullscreenIndex ?? 0) + 1} / {images.length}
                </p>
              </div>

              <button
                type="button"
                className="project-slider-fs__nav project-slider-fs__nav--next"
                onClick={(event) => {
                  event.stopPropagation()
                  stepFullscreen(1)
                }}
                aria-label={nextLabel}
              >
                →
              </button>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
