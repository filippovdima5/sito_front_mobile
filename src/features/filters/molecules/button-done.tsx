import React from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react/ssr'
import { Button1 } from '../../../commons/atoms'
import { $loading, $totalItems } from '../../products-page/store'
import { numeralEnding } from '../../../lib'
import { Loader } from '../../../commons/templates/loader'
import { $setShowFilters } from '../store'


export function ButtonDone() {
  const totalItems = useStore($totalItems)
  const loader = useStore($loading)
  const setShowFilters = useEvent($setShowFilters)
  
  return (
    <S.Wrap>
      <S.Filter/>
      <S.Container>
        <S.Inner>
          
          { loader && <Loader classNameRing={'ring-loader'} classNameBall={'ball-loader'}/> }
          
          <Button1 onClick={() => setShowFilters(false)} className='black-btn'>
            {numeralEnding(['Найдена', 'Найдено', 'Найдено'], totalItems)}
            <span className='num'> {totalItems} </span>
            {numeralEnding(['модель', 'модели', 'моделей'], totalItems)}
          </Button1>
          
        </S.Inner>
      </S.Container>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0;
    z-index: 9999999;
    box-sizing: border-box;
`,
  
  Filter: styled.div`
      background-color: rgba(0, 0, 0, 0.4);
      filter: invert(5);
      top: 100px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
`,
  
  Container: styled.div`
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`,
  
  Inner: styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    height: 50px;
    box-sizing: border-box;
    position: relative;
    
    & .ring-loader {
      top: 1px;
      width: 30px;
      height: 30px;
    }
    
    & .ball-loader {
      left: 3px;
      width: 30px;
      height: 30px;
    }
    
    & .black-btn {
      text-transform: uppercase;
      border-radius: 5px;
      background-color: #272727;
      border: transparent;
      font-weight: bold;
      color: white;
      width: 300px;
    }
`
}
