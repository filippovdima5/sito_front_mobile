import React from 'react'
import styled from 'styled-components'
import { SexId } from '../../../types'
import { MainBanner , BrandBanner, SaleBanners } from '../organisms'




export function HomePage({ sexId }: { sexId: SexId }) {
  
  return (
    <S.Wrap>
      <div className='banner'><MainBanner sexId={sexId}/></div>
      <div className='banner'><BrandBanner sexId={sexId}/></div>
      <div className='banner'><SaleBanners sexId={sexId}/></div>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    width: 100%;
    box-sizing: border-box;
    margin: 20px 0;
    
    & .banner{
      margin-top: 20px;
    }
    
    & .banner:nth-child(1) {
       margin-top: 0 !important;
    }
`
}

