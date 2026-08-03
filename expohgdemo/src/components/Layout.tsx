import { ComingSoon } from './ComingSoon'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <ComingSoon />
      </main>
      <Footer />
    </div>
  )
}
