import { useEffect } from 'react'

const usePeriodicSync = () => {
  useEffect(() => {
    async function registerForPeriodicSync() {
      const registration = await navigator.serviceWorker.ready
      if ('periodicSync' in registration) {
        const tags = await registration.periodicSync.getTags()
        try {
          if (!tags.includes('data-sync')) {
            await registration.periodicSync.register('data-sync', {
              minInterval: 12 * 60 * 60 * 1000
            })
          }
        } catch (error) {
          // Periodic background sync cannot be used.
        }
      }
    }
    registerForPeriodicSync()
  }, [])
}

export default usePeriodicSync
