import React from 'react'
import ReactDOM from 'react-dom'

import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/variable-full.css";
import "@fontsource/space-mono";
import "@fontsource/vt323";
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
