import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main className="main">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
