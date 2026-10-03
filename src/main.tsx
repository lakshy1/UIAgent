import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './shell/App'

declare global {
  interface Window { __koshReady?: () => void }
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

// Tell the opening loader in index.html that the app has painted, so it can play its exit.
requestAnimationFrame(() => requestAnimationFrame(() => window.__koshReady?.()))
