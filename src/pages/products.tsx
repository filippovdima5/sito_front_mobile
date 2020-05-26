import React  from 'react'
import { START } from 'lib/effector'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { ProductsPage } from '../features/products-page'



export function Products() {
  useBodyScrollTop()
  
  return <ProductsPage sexId={1}/>
}

Products[START] = ''
