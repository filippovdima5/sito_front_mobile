import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SexId } from '../../../types'
import {sexIdToStr} from '../../../lib'


const banner = {
  title: 'Converse',
  description: 'Конверсы давно признаны классической моделью,\n которая не оставит никого незамеченным',
  src: '/assets/brand-banner-1.jpg'
}

export function BrandBanner({ sexId }: { sexId: SexId }) {
  return (
    <S.Wrap to={`/${sexIdToStr(sexId)}/brands`}>
      <S.ContainerImage className='container'>
        <img alt={banner.title} src={banner.src} className='img' />
      </S.ContainerImage>
      <div className='container'>
        <S.Content>
          <div className='tag'>Бренды</div>
          <div className='title'>{banner.title}</div>
          <div className='description'>
            {banner.description.split('\n').map(item => (
              <span style={{ display: 'block' }} key={item}>
                {item}
              </span>
            ))}
          </div>
        </S.Content>
      </div>
      
      <div className='space'/>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled(Link)`
    position: relative;
    
    & .container {
        position: absolute;
        background-color: transparent;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    
    & .space {
      padding-bottom: 124.922118%;
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
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    
    & .tag {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 15px;
      left: 20px;
      width: 64px;
      height: 26px;
      background: rgba(5,9,18,0.5);
      border-radius: 5px;
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      color: #FFFFFF;
      text-transform: uppercase;
    }
    
    & .title {
      padding-top: 20%;
      color: black;
      font-family: 'Circe', sans-serif;
      text-transform: uppercase;
      font-weight: bold;
      padding-left: 20px;
      font-size: 30px;
    }
    
    & .description {
      font-style: normal;
      font-weight: normal;
      font-size: 11px;
      line-height: 14px;
      color: #272727;
      padding-left: 20px;
      margin-top: 10px;
    }
    
    @media (min-width: 360px) {
      .title {
          font-size: calc( 13.740458vw - 21.4656px );
          line-height: calc( 13.740458vw - 21.4656px );
       }
    }
`
}
