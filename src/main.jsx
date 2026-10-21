import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./i18n"
import App from './App.jsx'
import { initAnalytics } from '@/lib/analytics'

// Amb àncora a la URL, el navegador ja ha saltat a la secció dins de l'HTML
// prerenderitzat: tornem a dalt perquè les animacions es creïn bé i
// HashScroll hi salta després
if (window.location.hash) window.scrollTo(0, 0)

initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
