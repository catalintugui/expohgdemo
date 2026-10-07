import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="app">
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
