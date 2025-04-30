import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSessionState } from 'src/states/session'
import { getRouteURL } from 'src/utils/routes'
import { useShallow } from 'zustand/react/shallow'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'

export const withSessionHOC = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const params = useParams()
    const navigate = useNavigate()
    const setCurrentSession = useSessionState((state) => state.setCurrentSession)
    const isLoading = useSessionState(useShallow((state) => state.loadingCurrentSession))

    useLayoutEffect(() => {
      if (isLoading) {
        return
      }
      if (!params.id) {
        navigate(getRouteURL('sessions'))
        return
      }
      setCurrentSession(params.id)
    }, [params.id, isLoading])

    useEffect(() => {
      return () => {
        setCurrentSession(undefined)
      }
    }, [])

    if (isLoading) {
      return <DefaultLoader morphing />
    }

    return <Component {...props} />
  }
}
