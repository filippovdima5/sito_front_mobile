import styled from 'styled-components'


export const styledProductCard = {
  CardWrap: styled.div`
    // Потом можно прокидывать через пропсы размер отступов для разных мест расположения карточки!
    padding: 5px;

    box-sizing: border-box;
    width: 50%;
    user-select: none;
`,
  
  CardContainer: styled.div<{ isLike: boolean }>`
    width: 100%;
    padding-bottom: 187.965616%;
    position: relative;
    cursor: pointer;
    
    & .link {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
      opacity: 0;
    }
    
    & .flag {
      position: absolute;
      width: 44px;
      height: 30px;
      right: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    & .sale {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 1;
      text-align: center;
      background-color: #ED6C50;
      color: #FFFFFF;
      top: 0;
    }
    
    & .like {
      background-color: ${({ isLike }) => isLike ? '#ED6C50;' : 'rgba(0,0,0,0.2)'};
      top: 40px;
      
      & .like-container {
        width: 100%;
        height: 100%;
        position: relative;
        
        & .svg-heart{
        z-index: -1;
          position: absolute;
          top: 50%;
          left: 50%;
          fill: ${({ isLike }) => isLike ? 'white' : 'rgba(0,0,0,0.3)'};
        }
      }
      
      & .like-container .click {
        width: 150%;
        height: 150%;
        transform: translate(-25%,-18%);
        z-index: 999;
        background-color: transparent;
        
        
      }
    }
    
    & .like:hover {
       background-color: ${({ isLike }) => isLike ? 'rgba(237,108,80,0.8)' : 'rgba(0,0,0,0.1)'};
       
        & .svg-heart {
          fill: rgba(109,109,109,0.7);
        }
    }
    
`,
  
  CardInner: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
`,
  
  ImageWrap: styled.div`
    flex: 0.67682927;
`,
  
  MetaInfoWrap: styled.div`
    flex: 0.32317073;

    & .meta-item {
       font-family: 'Open Sans', sans-serif;
       font-style: normal;
       text-align: center;
       color:  #272727;
    }
`,
  
  Brand: styled.div`
    font-size: 18px;
    line-height: 19px;
    margin: 1% auto 0;
    
    width: 80%;
    
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    
    @media (min-width: 320px) {
        line-height: calc(3.8461538461538463vw + 6.692307692307692px);
        font-size: calc(2.307692307692308vw + 10.615384615384615px);
     }
  
`,
  
  Title: styled.div`
    font-size: 14px;
    line-height: 16px;
    margin: 1% auto 0;
    
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    opacity: 0.8;
    &:first-letter {
      text-transform: uppercase;
    }
    
     @media (min-width: 320px) {
        line-height: calc(2.307692307692308vw + 8.615384615384615px);
        font-size: calc(1.5384615384615385vw + 9.076923076923077px);
     }
`,
  
  Sizes: styled.div`
    width: 95%;
    margin: 1% auto 0;
    text-align: center;
    display: inline-flex;
    flex-flow: wrap;
    justify-content: center;
    white-space: normal;
    opacity: 0.8;
    font-size: 12px;
    
    & .size {
      display: inline;
      padding: 0 2px;
      text-transform: uppercase;
    }
    
    @media (min-width: 320px) {
        font-size: calc(3.076923076923077vw + 2.1538461538461533px);
     }
    
    
`,
  
  PriceInfo: styled.div`
    width: 100%;
    margin: 3% auto 0;
    text-align: center;

    display: flex;
    justify-content: center;
    flex-flow: nowrap;
    box-sizing: border-box;
    
    font-size: 14px;
    line-height: 15px;
    
    
    & .price, & .old-price {
      box-sizing: border-box;
      white-space: nowrap;
    }
    
    & .old-price {
      text-decoration: line-through;
      opacity: 0.8;
      margin-right: 3px;
    }
    
    & .price {
       white-space: nowrap;
       margin-left: 3px;
       font-weight: bold;
       color: #ED6C50;
    }
    
     @media (min-width: 320px) {
        line-height: calc(10vw - 17px);
        font-size: calc(3.8461538461538463vw + 1.6923076923076916px);
     }
    
`
}
