import { useEffect, lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Footer } from './components/ui/footer-section'
import Home from './pages/Home'
import { LanguageProvider } from './i18n/LanguageContext'

/* Route-level code splitting: the landing page (Home) ships eagerly,
   while the gallery and legal pages load on demand — keeping the
   initial bundle small for a fast first paint. */
const Gallery = lazy(() => import('./pages/Gallery'))
const VipService = lazy(() => import('./pages/VipService'))
const Impressum = lazy(() => import('./pages/Impressum'))
const Datenschutz = lazy(() => import('./pages/Datenschutz'))

/** Resets scroll to top on every route change (HashRouter keeps it otherwise). */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/vip" element={<VipService />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </Suspense>
        <Footer />
      </HashRouter>
    </LanguageProvider>
  )
}

export default App
