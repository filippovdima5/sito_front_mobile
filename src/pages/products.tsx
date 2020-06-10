import React, { useMemo } from 'react'
import { START } from 'lib/effector'
import { useLocation } from 'react-router'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { ProductsPage } from '../features/products-page'
import { findSexIdInPath } from '../lib'
import { $mountProductsPage } from '../features/products-page/store'


export function Products() {
  useBodyScrollTop()
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPath(pathname), [pathname])
  
  return <ProductsPage sexId={sexId}/>
}

Products[START] = $mountProductsPage
