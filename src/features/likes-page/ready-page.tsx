import React from 'react'
import {ProductCard} from '../../commons/organisms/product-card'
import {$likeProducts } from './store'
import {useStore} from 'effector-react/ssr'

export function ReadyPage() {
  const products = useStore($likeProducts)
  
  return (
    <div>
      {products.map(item => (
        <ProductCard showLike={true} {...item}/>
      ))}
    </div>
  )
}
