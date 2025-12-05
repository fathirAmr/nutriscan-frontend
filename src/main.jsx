window.addEventListener("error", (e) => {
  fetch(import.meta.env.VITE_API_URL + "/frontend-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "error", message: e.message }),
  }).catch(() => {});
});

window.addEventListener("unhandledrejection", (e) => {
  fetch(import.meta.env.VITE_API_URL + "/frontend-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "promise", message: e.reason }),
  }).catch(() => {});
});
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)