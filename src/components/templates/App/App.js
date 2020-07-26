import React from 'react'

import { Dashboard } from '../../organisms/Dashboard'

import useWebInstallPrompt from '../../../hooks/useWebInstallPrompt'
import usePeriodicSync from '../../../hooks/usePeriodicSync'

import './App.css'

function App() {
  const [, , handleInstallAccepted] = useWebInstallPrompt()
  usePeriodicSync()

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-link" onClick={() => handleInstallAccepted()}>
          Learn React
        </button>
      </header>
        <Dashboard />
    </div>
  )
}

export default App
