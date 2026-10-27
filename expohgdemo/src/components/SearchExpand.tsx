import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'
import { projectPathForProject } from '../lib/workPaths'
import { searchProjects } from '../lib/searchProjects'

const SUGGESTION_LIMIT = 3

export function SearchExpand() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

  const suggestions = useMemo(
    () => searchProjects(t.projects, query).slice(0, SUGGESTION_LIMIT),
    [query, t.projects],
  )

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()

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

  function submitSearch() {
    const trimmed = query.trim()
    if (!trimmed) return
    setOpen(false)
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  function handleToggleClick() {
    if (!open) {
      setOpen(true)
      return
    }
    if (query.trim()) {
      submitSearch()
      return
    }
    setOpen(false)
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      submitSearch()
    }
  }

  return (
    <div
      className={`search-expand${open ? ' is-open' : ''}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="search-expand__toggle"
        aria-label={t.nav.searchAria}
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={handleToggleClick}
      >
        <svg
          className="search-expand__icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="10.5"
            cy="10.5"
            r="5.75"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M15.25 15.25 20 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <input
        ref={inputRef}
        type="search"
        className="search-expand__input"
        placeholder={t.nav.searchPlaceholder}
        aria-label={t.nav.searchAria}
        aria-autocomplete="list"
        aria-controls={suggestions.length > 0 ? listboxId : undefined}
        value={query}
        tabIndex={open ? 0 : -1}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleInputKeyDown}
      />

      {open && suggestions.length > 0 && (
        <ul
          id={listboxId}
          className="search-expand__suggestions"
          role="listbox"
          aria-label={t.searchPage.suggestionsAria}
        >
          {suggestions.map((project) => (
            <li key={project.slug} role="option">
              <Link
                to={projectPathForProject(project)}
                className="search-expand__suggestion"
                onClick={() => setOpen(false)}
              >
                <span className="search-expand__suggestion-title">
                  {project.title}
                </span>
                <span className="search-expand__suggestion-meta">
                  {project.period === 'b' ? 'USA' : 'RO'}
                  {project.year ? ` / ${project.year}` : ''}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
