import React, { FC } from 'react'
import styled from 'styled-components'


type Props = {
  title?: string,
  search?: React.ReactNode,
}

export const FilterCurtain: FC<Props> = (props) => {
  
  return (
    <S.Wrap>
      <S.Body>
        { props.search && <S.SearchContainer>{props.search}</S.SearchContainer> }
        <S.ScrollContainer>
          <ul>{props.children}</ul>
        </S.ScrollContainer>
        <div className='space'/>
      </S.Body>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    user-select: none;
    background-color: #FFFFFF;
    padding: 18px 25px 0;
    min-height: 100%;
    box-sizing: border-box;
`,
  
  Body: styled.div`
    & .space {
      padding-bottom: 90px;
    }
`,
  
  SearchContainer: styled.div`
    margin-bottom: 20px;
`,
  
  ScrollContainer: styled.div`
    min-height: 100%;
`
}
