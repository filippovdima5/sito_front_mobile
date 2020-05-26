import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SexId } from '../../../types'
import { namesCategory } from '../../../constants/category-keys'
import { sexIdToStr } from '../../../helpers/lib'


const saleBanners = [
  { categoryId: 1003, percent: 85 },
  { categoryId: 2001, percent: 50 },
  { categoryId: 3001, percent: 70 },
]

export function SaleBanners({ sexId }: { sexId: SexId }) {
  return (
    <S.Wrap>
      { saleBanners.map(({ percent, categoryId }) => (
        <S.Banner
          to={`/${sexIdToStr(sexId)}/products?categories=${categoryId}`}
          key={categoryId} className='banner'>
          <div className='space'/>
          <S.Image className='container'>
            <img
              className='img'
              src={`/assets/sale-banner-${categoryId}.jpg`}
              alt={namesCategory[1][categoryId as 2001]}
            />
          </S.Image>
          <S.Content className='container'>
            <div className='tag'>
              <span className='text'>
                {namesCategory[1][categoryId as 2001]}
              </span>
            </div>
            <S.SaleInfo>
              <div className='sale'>{percent}%</div>
              <div className='text'>скидки</div>
            </S.SaleInfo>
          </S.Content>
        </S.Banner>
      )) }
    </S.Wrap>
  )
} 


const S = {
  Wrap: styled.div`
    width: 100%;
    box-sizing: border-box;
    
    
    & .space {
        padding-bottom: 103.4375%;
    }
`,
  
  Banner: styled(Link)`
      position: relative;
      
    &:nth-child(2) {
      margin: 20px 0;
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
`,
  
  Image: styled.div`
     & .img {
        width: 100%;
        height: 100%;
        display: block;
    }
`,
  
  Content: styled.div`
    position: relative;

    & .tag {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 15px;
      left: 20px;
      width: 90px;
      height: 26px;
      background: rgba(5,9,18,0.5);
      border-radius: 5px;
      font-style: normal;
      padding: 0 5px;
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      color: #FFFFFF;
      text-transform: uppercase;
    }
    
    & .tag .text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
`,
  
  SaleInfo: styled.div`
      position: absolute;
      left: 20px;
      bottom: 23px;
      color: #FFFFFF;
      
      & .sale {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 72px;
        line-height: 70px;
      }
      
      & .text{
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 38px;
        text-transform: uppercase;
      }
`
}
