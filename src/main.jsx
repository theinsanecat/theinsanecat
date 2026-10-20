import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PerformanceProvider } from './context/PerformanceContext'
import './styles/index.css'
import App from './App.jsx'

// Clean page links (…/theinsanecat/about). GitHub Pages has no SPA routing, so 404.html sends
// unknown paths back here as ?p=<path>; old #/about links are upgraded the same way.
const BASE = import.meta.env.BASE_URL
const redirected = new URLSearchParams(window.location.search).get('p')
if (redirected !== null) {
  window.history.replaceState(null, '', BASE + redirected.replace(/^\//, '') + window.location.hash)
} else if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', BASE + window.location.hash.slice(2))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={BASE.replace(/\/$/, '')}>
      <PerformanceProvider>
        <App />
      </PerformanceProvider>
    </BrowserRouter>
  </StrictMode>,
)
