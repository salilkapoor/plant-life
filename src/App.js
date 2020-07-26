import React from 'react'

import useWebInstallPrompt from './hooks/useWebInstallPrompt'

import './App.css'

import logo from './logo.svg'

function App() {
  const [
    installPromptEvent,
    handleInstallDeclined,
    handleInstallAccepted
  ] = useWebInstallPrompt()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="App-link" onClick={() => handleInstallAccepted()}>
          Learn React
        </button>
      </header>
    </div>
  )
}

export default App
