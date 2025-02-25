import React from 'react'
import styled from 'styled-components'
import { useEvent } from 'effector-react/ssr'
import styles from '../header.module.scss'
import { ArrowLong } from '../../../../assets/svg'
import { $setShowFilter } from '../../store'
import { $skipFilter } from '../../../products-page/store'


type Props = {
  title?: string,
  index?: string,
}


export function OneFilterHeader({ title, index }: Props) {
  const setShowFilter = useEvent($setShowFilter)
  const skipFilter = useEvent($skipFilter)
  
  return (
    <div className={styles.header}>
      <div className={styles.headerWrap}>
        <S.BackBtn onClick={() => setShowFilter(null)}>
          <ArrowLong
            className='arrow-long'
          />
        </S.BackBtn>
        <S.Title>{title}</S.Title>
        <S.SkipAll onClick={() => {
          index && skipFilter(index)
        }}>Очистить все</S.SkipAll>
      </div>
    </div>
  )
}


const S = {
  Wrap: styled.div``,
  
  BackBtn: styled.div`
    position: relative;
    width: 50px;
    
    & .arrow-long {
      width: 50px;
      top: 50%;
      right: -20px;
      position: absolute;
      fill: #272727;
    }
`,
  
  Title: styled.div`
    margin-left: 20px;
    font-weight: bold;
    font-size: 16px;
    line-height: 48px;
    color: #272727;
    font-family:  Raleway, sans-serif;;
`,
  
  SkipAll: styled.div`
    margin-left: auto;
    padding: 0 21px 0 10px;
    line-height: 48px;
    font-weight: 500;
    font-size: 16px;
    text-decoration: underline;
    color: rgba(39,39,39,0.8);
`
}
