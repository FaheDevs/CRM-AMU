import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { Clients } from './pages/clients/Clients'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Clients />
  </React.StrictMode>
)
