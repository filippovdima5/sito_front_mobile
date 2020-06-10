import React, { useMemo } from 'react'
import { useLocation } from 'react-router'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { HomePage } from '../features/home-page/home-page'
import { findSexIdInPath } from '../lib'
import { START } from '../lib/effector'


export function Home() {
  useBodyScrollTop()
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPath(pathname), [pathname])
  
  
  return <HomePage sexId={sexId}/>
}

// !!! SSR
Home[START] = ''
