import React from 'react'
import styled from 'styled-components'
import { ReadyList } from '../molecules'


export function ProductsList() {
  return (
    <S.Wrap>
      <S.List>
      
        <ReadyList/>
        
      </S.List>
    </S.Wrap>
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
`
}
