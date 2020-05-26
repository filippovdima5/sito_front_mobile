import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { findSexIdInPathNotStrict, sexIdToStr } from '../../lib'


export function Logo({ color }: { color?: string }) {
  const { pathname } = useLocation()
  
  const url = useMemo(() => {
    const sex = findSexIdInPathNotStrict(pathname)
    if (!sex) return '/'
    return `/${sexIdToStr(sex)}/home`
  }, [pathname])
  
  return (
    <S.Logo to={url}>
      <S.Text color={color}>Sito</S.Text>
    </S.Logo>
  )
}


const S = {
  Logo: styled(Link)`
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;
`,
  
  Text: styled.div<{ color?: string }>`
    height: 100%;
    font-weight: 700;
    line-height: 60px;
    text-transform: uppercase;
    letter-spacing: 4.5px;
    font-size: 45px;
    color: ${({ color }) => color ?? '#060a0f'}
`
}
