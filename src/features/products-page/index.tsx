import React  from 'react'
import { useEvent } from 'effector-react/ssr'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { SexId } from '../../types'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { $mountProductsPage } from './store'
import { ProductsList } from './organisms'


export function ProductsPage({ sexId }: { sexId: SexId }) {
  const mountProductsPage = useEvent($mountProductsPage)
  const { pathname, search } = useLocation()
  
  useEffectSafe(() => {
    mountProductsPage({ pathname, search })
  }, [sexId])
  
  return (
    <S.Wrap>
      <S.Controls>
      
      </S.Controls>
      
      <ProductsList/>
      
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    margin-bottom: 60px;
`,
  
  Controls: styled.div`
    height: 45px;
    background-color: #E9E9E9;
    position: relative;
    width: 100vw;
    margin-left: -18px;
    box-sizing: border-box;
`,
}
