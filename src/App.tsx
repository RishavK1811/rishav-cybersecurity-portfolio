import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { HashScrollRestorer } from './components/HashScrollRestorer'
import { Navigation } from './components/Navigation'
import { PageTransition } from './components/PageTransition'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'

function App() {
  return (
    <PageTransition>
      {(renderedLocation) => {
        const isHome = renderedLocation.pathname === '/'

        return (
          <div className="site-shell">
            <a className="skip-link" href="#main-content">Skip to content</a>
            <HashScrollRestorer location={renderedLocation} />
            <Navigation />
            <main id="main-content" tabIndex={-1}>
              <Routes location={renderedLocation}>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer compact={!isHome} />
          </div>
        )
      }}
    </PageTransition>
  )
}

export default App
