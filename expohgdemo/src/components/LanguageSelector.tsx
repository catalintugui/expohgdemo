import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from '../i18n/I18nContext'
import { LOCALES } from '../i18n/translations'
import type { Locale } from '../i18n/types'

export function LanguageSelector() {
  const { locale, setLocale, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function choose(next: Locale) {
    setLocale(next)
    setOpen(false)
  }

  return (
    <div className="lang-selector" ref={rootRef}>
      <div className="lang-dropdown">
        <button
          type="button"
          className="lang-dropdown__trigger"
          aria-label={t.nav.languageAria}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{t.lang[locale]}</span>
          <span className="lang-dropdown__caret" aria-hidden="true" />
        </button>

        {open && (
          <ul id={listboxId} className="lang-dropdown__menu" role="listbox">
            {LOCALES.map((code) => (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  className={locale === code ? 'is-active' : undefined}
                  aria-selected={locale === code}
                  onClick={() => choose(code)}
                >
                  {t.lang[code]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lang-switch" role="group" aria-label={t.nav.languageAria}>
        {LOCALES.map((code) => (
          <button
            key={code}
            type="button"
            className={locale === code ? 'is-active' : undefined}
            aria-pressed={locale === code}
            onClick={() => setLocale(code)}
          >
            {t.lang[code]}
          </button>
        ))}
      </div>
    </div>
  )
}
