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
    //border: 1px solid green;
    background-color: #FFFFFF;
    padding: 18px 25px 0;
`,
  
  Body: styled.div`
    & .space {
      padding-bottom: 20px;
    }
`,
  
  SearchContainer: styled.div`
    margin-bottom: 20px;
`,
  
  ScrollContainer: styled.div`
    min-height: 100%;
`
}
