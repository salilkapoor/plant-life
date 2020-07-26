import { useState, useEffect } from 'react'

const useWebInstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState()

  useEffect(() => {
    const beforeInstallPromptHandler = (event) => {
      event.preventDefault()
      setInstallPromptEvent(event)
    }
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)
    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler
      )
  }, [])

  const handleInstallDeclined = () => {
    setInstallPromptEvent(null)
  }

  const handleInstallAccepted = () => {
    installPromptEvent.prompt()
    installPromptEvent.userChoice.then((choice) => {
      if (choice.outcome !== 'accepted') {
        console.log('User has dismissed the request.')
      }
      setInstallPromptEvent(null)
    })
  }
  return [installPromptEvent, handleInstallDeclined, handleInstallAccepted]
}

export default useWebInstallPrompt
