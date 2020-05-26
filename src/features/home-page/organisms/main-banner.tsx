import React from 'react'
import styled from 'styled-components'
import { SexId } from '../../../types'


export function MainBanner({ sexId }: { sexId: SexId }) {
  return (
    <S.Wrap>
      <div className='filter'/>
      <S.ContainerImage className='container'>
        <img className='img' alt='' src='/assets/main-banner.jpg'/>
      </S.ContainerImage>
      
      <S.Content className='container'>
        <h1 className='title'>Все скидки<br/>в одном месте</h1>
      </S.Content>
      <div className='space'/>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    position: relative;
    
    & .filter {
      position: absolute;
      background-color: rgba(0,0,0,0.2);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;
      z-index: 2;
    }
    
    & .container {
        position: absolute;
        background-color: transparent;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        z-index: 1;
    }
    
    & .space {
      padding-bottom: 140.186916%;
    }
`,
  
  ContainerImage: styled.div`
    & .img {
        width: 100%;
        height: 100%;
        display: block;
    }
`,
  
  Content: styled.div`
    z-index: 3 !important;
    & .title {
       font-family: 'Circe', sans-serif;
       padding-top: 17.5%;
       color: #FFFFFF;
       font-size: 24px;
       line-height: 28px;
       text-align: center;
       font-weight: bold;
    }
    
    @media (min-width: 360px) {
      .title {
          font-size: calc( 13.740458vw - 21.4656px );
          line-height: calc( 13.740458vw - 21.4656px );
       }
    }
`
}
