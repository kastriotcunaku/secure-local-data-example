import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-6">
      <App />
      <div className="text-center pt-3">
        <a href="https://github.com/kastriotcunaku/secure-local-data-example" target="_blank">GitHub ↗</a>
      </div>
    </main>
  </StrictMode>,
)
