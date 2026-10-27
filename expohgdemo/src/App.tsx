import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ExhibitionPage = lazy(() =>
  import('./pages/ExhibitionPage').then((m) => ({ default: m.ExhibitionPage })),
)
const LegacyProjectRedirect = lazy(() =>
  import('./pages/LegacyProjectRedirect').then((m) => ({
    default: m.LegacyProjectRedirect,
  })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)
const ProjectPage = lazy(() =>
  import('./pages/ProjectPage').then((m) => ({ default: m.ProjectPage })),
)
const SearchPage = lazy(() =>
  import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })),
)
const WorkPage = lazy(() =>
  import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })),
)

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="exhibition" element={<ExhibitionPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="work/romania/:category/:slug" element={<ProjectPage />} />
          <Route path="work/usa/:category/:slug" element={<ProjectPage />} />
          <Route path="work/romania/:category" element={<WorkPage period="a" />} />
          <Route path="work/usa/:category" element={<WorkPage period="b" />} />
          <Route
            path="work/romania"
            element={<Navigate to="/work/romania/housing" replace />}
          />
          <Route path="work/usa" element={<Navigate to="/work/usa/housing" replace />} />
          <Route path="work/:slug" element={<LegacyProjectRedirect />} />
          <Route path="work" element={<Navigate to="/work/romania/housing" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
