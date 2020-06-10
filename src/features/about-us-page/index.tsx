import React from 'react'
import styled from 'styled-components'
import { useBodyScrollTop } from '../../hooks/use-body-scroll-top'



export function AboutAs() {
  useBodyScrollTop()
  
  return (
    <S.Wrap>
      
      <S.Title>Первый в мире онлайн-сервис, который выискивает самые горячие скидки</S.Title>
      
      <S.Content>
        <S.P>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.</S.P>
      </S.Content>
      
      <S.VideoWrap>
          <S.VideoInner>
            <iframe id={'video'} title={'video'} width="300" height="200" src="https://www.youtube-nocookie.com/embed/U0bQUlGWXUs?controls=0" frameBorder="0"
              allow="accelerometer;   " allowFullScreen={false}/>
          </S.VideoInner>
      </S.VideoWrap>
  
      <S.Content>
        <S.P>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt .
          Nemo enim ipsam
          voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
          dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
          dolor sit amet, consectetur,
          adipisci velit, sed quia non numquam eius modi tempora incidunt quaerat voluptatem.
        </S.P>
      </S.Content>
    </S.Wrap>
  )
}



const S = {
  Wrap: styled.div`
    width: 100%;
    margin: 25px auto;
`,
  
  Title: styled.h1`
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    text-align: center;
    font-size: 22px;
    line-height: 25px;
    color: #272727;
    margin-bottom: 25px;
    
    & .space {
      width: 25px;
      display: inline-block;
    }
`,
  
  Content: styled.div`
    text-align: center;
    width: 100%;
    padding: 0 50px;
    margin-bottom: 20px;
    box-sizing: border-box;
    
`,
  
  P: styled.p`
      font-size: 14px;
line-height: 30px;
color: #272727;
opacity: 0.8;
`,
  
  
  VideoWrap: styled.div`
    width: 300px;
    margin: 0 auto 20px;
    position: relative;
    height: 200px;
`,
  

  
  VideoInner: styled.div`
position: relative;
    height: 100%;
    width: 100%;
`
}
