import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react/ssr'
import { ReadyList, LoadingList } from '../molecules'
import { $statusPageProducts, $allFields, $totalItems, $countMoreProducts } from '../store'
import { numeralEnding } from '../../../lib'


function List() {
  const status = useStore($statusPageProducts)
  const { limit, page } = useStore($allFields)
  const countMoreProducts = useStore($countMoreProducts)
  
  
  if ((status === 'START' || (status === 'LOADING' && page === 1))) return (
    <LoadingList count={limit}/>
  )
  
  return (
    <>
      <ReadyList/>
      { countMoreProducts !== null && <LoadingList count={countMoreProducts}/> }
    </>
  )
}


export function ProductsList() {
  const totalItems = useStore($totalItems)
  
  
  return (
    <div>
      <S.Info>
        <span>
          {numeralEnding(['Найдена', 'Найдено', 'Найдено'], totalItems)} 
          <span className='num'> {totalItems} </span>
          {numeralEnding(['модель', 'модели', 'моделей'], totalItems)}
        </span>
      </S.Info>
      <S.Wrap>
        <S.List>
          <List/>
        </S.List>
      </S.Wrap>
    </div>
  )
}


const S = {
  Wrap: styled.div`
   height: 100%;
   background-color: transparent;
   width: 100%;
   position: relative;
   display: flex;
`,
  
  List: styled.div`
    flex: 1;
    box-sizing: border-box;
    margin: -5px;
    position: relative;
    z-index: 1;
    display: flex;
    flex-flow: wrap;
    justify-content: flex-start;
    width: 100%;
`,
  
  Info: styled.div`
    height: 60px;
    font-size: 14px;
    line-height: 60px;
    color: rgba(39,39,39,0.8);
    text-align: center;
 
    
    & .num {
      font-family: 'Open Sans', sans-serif;
      font-weight: bold;
    }
`
}
