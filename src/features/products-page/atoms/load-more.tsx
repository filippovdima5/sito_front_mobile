import React from 'react'
import styled from 'styled-components'
import { $products, $totalItems, $setMoreProducts } from '../store'
import {useEvent, useStore} from 'effector-react/ssr'


export function LoadMore() {
  const products = useStore($products)
  const total = useStore($totalItems)
  const setMoreProducts = useEvent($setMoreProducts)
  
  return (
    <S.Wrap
      onClick = {() => setMoreProducts({ viewProductsCount: products.length, totalProducts: total })}
    >
      Загрузить еще
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.button`
   height: 60px;
   width: 100%;
   margin-top: 20px;
   background-color: #E9E9E9;
   font-weight: 500;
   font-size: 18px;
   text-align: center;
   line-height: 60px;
   color: rgba(39,39,39,0.8);
`
}
