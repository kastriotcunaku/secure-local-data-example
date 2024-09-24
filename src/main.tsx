import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <App />
    </main>
  </StrictMode>,
)
