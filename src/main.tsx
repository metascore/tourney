import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

// IC stuff relies on global
(window as any).global = window;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
