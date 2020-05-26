import { createGlobalStyle } from 'styled-components'
import { resetStyles } from './reset'
import { getFonts } from './font-face'


export const GlobalStyle = createGlobalStyle`
    ${getFonts}
    ${resetStyles}
    
    body {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin: 0;
      font-family: 'Raleway', sans-serif;
      background-color: #f2f2f2;
      box-sizing: border-box;
    }
`
