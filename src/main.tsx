import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route par défaut (anglais) */}
        <Route path="/" element={<App />} />
        
        {/* Routes avec langue */}
        <Route path="/:lang" element={<App />} />
        
        {/* Routes de partage */}
        <Route path="/share/:code" element={<App />} />
        <Route path="/:lang/share/:code" element={<App />} />
        
        {/* Redirection des routes invalides vers la page d'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
