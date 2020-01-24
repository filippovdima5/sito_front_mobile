import React, { useEffect, useRef } from 'react'
import useRouter from 'use-react-router'
import { parseSearch } from '../../helpers/functions/parseSearch'
import { sexIdDetected } from '../../helpers/functions/sexIdDetected'
import { hookFirstUrl } from './store'


const HookFirstUrl = React.memo(function RoutStateSetting() {
  const { match: { params: { sex } }, location: { search } } = useRouter()
  const paramsRef = useRef({ sex, search })

  useEffect(() => {
    hookFirstUrl({
      ...sexIdDetected(paramsRef.current.sex),
      ...parseSearch(paramsRef.current.search)
    })
  }, [])
})

export { HookFirstUrl }