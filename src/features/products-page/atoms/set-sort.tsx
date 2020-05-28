import React from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import styled from 'styled-components'
import { $setSort, $allFields } from '../store'
import { sortTypes } from '../constants'


type Props = {
  showSort: boolean,
  setShowSort: (value: boolean) => void,
}


export function SetSort({ showSort, setShowSort }: Props) {
  const setSort = useEvent($setSort)
  const { sort } = useStore($allFields)
  
  if (!showSort) return null
  
  return (
    <S.Wrap>
      { Object.entries(sortTypes).map(([key, value]) => (
        <S.SortOption
          active={key === sort}
          onClick={() => {
            setSort(key as keyof typeof sortTypes)
            setShowSort(false)
          }}
          key={key}
          className='sort-option'
        >
          {value}
        </S.SortOption>
      )) }
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    background-color: white;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    
    box-shadow: 0 0 20px rgba(189, 189, 189, 0.25)
`,
  
  SortOption: styled.div<{ active: boolean }>`
      width: 100%;
      cursor: pointer;
      padding: 12px 20px 13px;
      color: rgba(39,39,39,0.8);
      box-sizing: border-box;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
     
      
      background-color: ${({ active }) => active ? '#E6E6E6' : 'transparent'};
`,
}
