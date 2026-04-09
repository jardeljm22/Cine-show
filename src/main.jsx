import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/index.css'
import Rotes from './routes/rotes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotes />
  </StrictMode>,
)
