import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const data = [
  { index: 'women', title: 'Для женщин', url: '/women/home' },
  { index: 'men', title: 'Для мужчин', url: '/men/home' },
] as const


export function GenderDetected() {
  
  return (
    <S.Main>
      <div className='wrap'>
        {data.map(({ index, title, url }) => (
          <Link
            to={url}
            key={index}
            className='genderWrap'
          >
            <S.Gender className='gender'>
              <img
                src={`/assets/gender-${index}.jpg`}
                alt={title} className='img'
              />
        
              <div className='titleWrap'>
                <div className='title'>{title}</div>
              </div>
            </S.Gender>
          </Link>
        ))}
      </div>
    </S.Main>
  )
}


const S = {
  Main: styled.div`
      width: 100%;
      box-sizing: border-box;
      padding: 20px 0;
      
      & .wrap {
        height: 100%;
      }
      
      & .genderWrap {
         overflow: hidden;
         padding-bottom: 65%;
      }
      
      & .genderWrap:first-child {
         margin-bottom: 20px;
      }
`,
  
  Gender: styled.div`
      position: relative;
      
     & .img{
      width: 100%;
      display: block;
      top: 0;
      position: absolute;
    }

      & .titleWrap{
        position: absolute;
        padding-top: 23%;
        top: 0;
        display: flex;
        width: 100%;
        height: 100%;
        text-align: center;
      }
  
        & .title{
          flex-flow: column wrap;
          margin: auto;
          width: 100%;
          text-transform: uppercase;
          font-size: 20px;
          font-weight: bold;
          color: white;
      }
`
}
