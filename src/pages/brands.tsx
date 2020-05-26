import React  from 'react'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { $mountBrandsPage } from '../features/brands-page/store'
import { BrandsPage } from '../features/brands-page'
import { START } from '../lib/effector'


export function Brands() {
  useBodyScrollTop()

  return <BrandsPage sexId={1}/>
}

Brands[START] = $mountBrandsPage
