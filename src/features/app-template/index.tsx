import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../../assets/styles/global-styled'
import config from '../../config'
import BackToTop from '../../commons/molecules/back-to-top'
import { Header } from '../header'
import { Pages } from '../../pages'


export function AppTemplate() {
  return (
    <>
      <GlobalStyle/>
      <S.App>
        <S.Content>
          <div className='header-space'/>
          <S.Header>
            <Header/>
          </S.Header>
          
          <S.Container>
            <S.Main>
              <div className='content-box'>
                <Pages/>
              </div>
            </S.Main>
            <S.Footer>
              footer
              
              <div className='footer-space'/>
            </S.Footer>
          </S.Container>
        </S.Content>
      </S.App>
  
      {!config.ssr && <BackToTop/>}
    </>
  )
}

const S = {
  App: styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 100%;
    box-sizing: border-box;
`,
  
  Content: styled.div`
      position: relative;
      display: block;
      flex-direction: column;
      box-sizing: border-box;
     
      & .header-space {
        box-sizing: border-box;
        height: 50px;
      }
`,
  
  Header: styled.header`
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    box-shadow: 0 0 20px rgba(189, 189, 189, 0.25);
`,
  
  Container: styled.div`
    display: flex;
    min-height: calc(100vh - 52px);
    flex-flow: column;
    box-sizing: border-box;
`,
  
  Main: styled.main`
      padding: 0 18px;
      margin: 0 auto;
      width: 100%;
      flex: 1;
      display: flex;
      box-sizing: border-box;
      
      & .content-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        //border: 1px solid green;
      }
`,
  
  Footer: styled.footer`
      margin-top: auto;
      width: 100%;
      box-sizing: border-box;
      height: 200px;
      background-color: #383838;
      
      & .footer-space {
        background-color: #383838;
        height: 200px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        z-index: -1;
      }
`
}
