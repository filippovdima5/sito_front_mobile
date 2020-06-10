import React, { useMemo } from 'react'
import { useLocation } from 'react-router'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { $mountBrandsPage } from '../features/brands-page/store'
import { BrandsPage } from '../features/brands-page'
import { START } from '../lib/effector'
import { findSexIdInPath } from '../lib'


export function Brands() {
  useBodyScrollTop()
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPath(pathname), [pathname])
  
  return <BrandsPage sexId={sexId}/>
}

Brands[START] = $mountBrandsPage
