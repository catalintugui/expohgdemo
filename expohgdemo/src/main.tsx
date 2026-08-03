import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

document.title = 'Arhiva Haralamb Georgescu'
document.documentElement.lang = 'en'

const description = document.querySelector('meta[name="description"]')
if (description) {
  description.setAttribute(
    'content',
    'Arhiva Haralamb Georgescu // work and details',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
