import React, { FC } from 'react'
import styled from 'styled-components'
import styles from '../styles/commons.module.scss'


type Props = {
  idElement: string,
  header: React.ReactNode,
  isWrap?: boolean,
}

export const FiltersWrap: FC<Props> = (props) => (
  <S.Wrap  className={props.isWrap ? styles.filtersList : styles.filter}>
    <S.Header>
      <div className='header'>
        {props.header}
      </div>
    </S.Header>
    <S.Body id={props.idElement} >
      {props.children}
    </S.Body>
    
  </S.Wrap>
)



const S = {
  Wrap: styled.div`
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    position: fixed;
`,
  
  Header: styled.div`
      margin-bottom: 4px;
      box-sizing: border-box;
      padding: 0;
      
      & .header {
          height: 48px;
          position: relative;
          z-index: 1;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 3px rgba(0,0,0,.12);
      }
`,
  
  
  Body: styled.div`
    position: relative;
    height: calc(100% - 55px);
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 3px rgba(0, 0, 0, 0.12);
`,
  
  Space: styled.div`
    padding-bottom: 70px;
`
}
