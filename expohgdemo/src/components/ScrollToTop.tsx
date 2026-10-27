import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    // Keep scroll position when using browser back/forward
    if (navigationType === 'POP') return

    const main = document.querySelector('.main')
    if (main instanceof HTMLElement) {
      main.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, navigationType])

  return null
}
