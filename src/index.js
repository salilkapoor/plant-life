import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/templates/App/App'
import { registerWorker } from './utils/sw/serviceWorker'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// registerWorker()
