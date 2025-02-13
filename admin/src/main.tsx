import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import GlobalState from './context/adminContext.tsx'

createRoot(document.getElementById('root')!).render(
  <GlobalState>
    <App />
  </GlobalState>,
)
