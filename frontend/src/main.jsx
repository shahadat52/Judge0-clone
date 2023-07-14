import React from 'react'
import { Toaster } from 'react-hot-toast';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/contextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <Toaster />
    </ContextProvider>
  </React.StrictMode>,
)
