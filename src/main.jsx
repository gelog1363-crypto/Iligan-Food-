// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register' // This is the preferred method

// 1. PWA Registration (Use the plugin's function)
// This registers the generated '/sw.js' file and handles updates.
registerSW({ immediate: true }) 

// 2. Remove the conflicting manual registration block:
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js') // This path is wrong!
      .then(registration => {
        console.log('ServiceWorker registration successful:', registration);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)