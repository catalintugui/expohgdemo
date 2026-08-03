import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { content } from './content.ts'

document.title = content.meta.title
document.documentElement.lang = 'en'

const description = document.querySelector('meta[name="description"]')
if (description) {
  description.setAttribute('content', content.meta.description)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
