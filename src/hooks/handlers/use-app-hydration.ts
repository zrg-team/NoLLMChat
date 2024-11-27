import { useEffect, useState } from 'react'
import { useAppState } from 'src/states/app'

export const useAppHydration = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = useAppState.persist.onHydrate(() => setHydrated(false))

    const unsubFinishHydration = useAppState.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(useAppState.persist.hasHydrated())

    return () => {
      unsubHydrate()
      unsubFinishHydration()
    }
  }, [])

  return hydrated
}
