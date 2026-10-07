import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ExhibitionPage } from './pages/ExhibitionPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { UnavailablePage } from './pages/UnavailablePage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="exhibition" element={<ExhibitionPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="work/romania/:category" element={<UnavailablePage />} />
        <Route path="work/usa/:category" element={<UnavailablePage />} />
        <Route
          path="work/romania"
          element={<Navigate to="/work/romania/housing" replace />}
        />
        <Route path="work/usa" element={<Navigate to="/work/usa/housing" replace />} />
        <Route path="work" element={<Navigate to="/work/romania/housing" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
