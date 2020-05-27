import React from 'react'
import { useStore } from 'effector-react/ssr'
import { $products } from '../store'
import { ProductCard } from '../../../commons/organisms/product-card'


export function ReadyList() {
  const data = useStore($products)
  
  return (
    <>
      { data.map(props => (
        <ProductCard key={props.id} {...props}/>
      )) }
    </>
  )
}
