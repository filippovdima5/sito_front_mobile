import React, { useMemo } from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { SexId } from '../../types'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { $mountProductsPage, $products, $totalItems } from './store'
import { ProductsList } from './organisms'
import { LoadMore } from './atoms'
import { Controls } from './organisms/control-products'
import {Filters} from '../filters'


export function ProductsPage({ sexId }: { sexId: SexId }) {
  const mountProductsPage = useEvent($mountProductsPage)
  const { pathname, search } = useLocation()
  
  const products = useStore($products)
  const total = useStore($totalItems)
  const showLoadMore = useMemo(() => products.length < total, [total, products])
  
  useEffectSafe(() => {
    mountProductsPage({ pathname, search })
  }, [sexId])
  
  return (
    <>
      <S.Wrap>
        <Controls/>
        <S.Controls/>
        <ProductsList/>
        { showLoadMore &&  <LoadMore/> }
      </S.Wrap>
      
      <Filters/>
    </>
  )
}


const S = {
  Wrap: styled.div`
    margin-bottom: 60px;
`,
  
  Controls: styled.div`
    height: 45px;
    background-color: transparent;
    position: relative;
    width: 100vw;
    margin-left: -18px;
    box-sizing: border-box;
`,
}
