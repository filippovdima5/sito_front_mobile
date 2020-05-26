import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link , useLocation } from 'react-router-dom'
import { Logo } from '../../commons/atoms/logo'



export function Footer() {
  const { pathname } = useLocation()
  
  const sex = useMemo(() => {
    if (!pathname.includes('/men')) return null
    if (pathname.includes('/women')) return 'women'
    return 'men'
  }, [pathname])
  
  return (
    <S.Wrap>
      <S.Top>
        <div className='logo'>
          <Logo color='#fbfbfb'/>
        </div>
        <div className='icons'>
          <S.IconWrap href='https://vk.com/sito.store' target='_blank'><img src={'/icons/vk.svg'} alt='vk'/></S.IconWrap>
          <S.IconWrap href='https://www.youtube.com/channel/UCP7EyqO5XlzPZvN_39w_YNw' target='_blank'><img src={'/icons/youtube.svg'} alt='youtube'/></S.IconWrap>
          <S.IconWrap href='https://www.instagram.com/sito.store' target='_blank'><img src={'/icons/instagram.svg'} alt='instagram'/></S.IconWrap>
        </div>
        <S.Menu>
          <li className='item'>
            <Link to={!sex ? '/about' : `/${sex}/about`}>О нас</Link>
          </li>
          <li className='item'>
            <Link to={!sex ? '/private-office' : `/${sex}/private-office`}>Избранное</Link>
          </li>
        </S.Menu>
      </S.Top>
      
      <S.Bottom>
        <span>© SITO
          <span className='year'> {new Date().getFullYear()}</span>
        </span>
      </S.Bottom>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    width: 100%;
    height: 100%;
    
    & .logo {
      padding-top: 10px;
      display: flex;
      justify-content: center;
    }
    
    & .icons {
      padding: 10px 0 20px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
`,
  
  IconWrap: styled.a`
    margin: 0 7px;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
   // border: 2px solid #727272;
    
    & img {
      display: block;
      width: 100%;
      height: 100%;
    }
`,
  
  Menu: styled.ul`
    & .item {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      padding: 10px  0;
      border-top: 1px solid #3D3D3D;
    }
    
    & a {
      color: #FFFFFF;
    }
`,
  
  Top: styled.div`
      background-color: #272727;
`,
  
  Bottom: styled.div`
    text-align: center;
    padding: 20px 0;
    color: #fbfbfb;
    
    & .year {
       font-family: 'Open Sans', sans-serif;
    }
    
   
`
}

