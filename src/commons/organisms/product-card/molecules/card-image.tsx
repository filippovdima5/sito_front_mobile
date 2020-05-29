import React, { useState } from 'react'
import styled from 'styled-components'
import { Skeleton } from '../../../atoms/skeleton'
import config from '../../../../config'


type Props = {
  title: string,
  src: string,
  skeleton?: boolean,
  
}

export function CardImage({ title, src, skeleton }: Props) {
  const [ isLoad, setIsLoad ] = useState<'ok' | 'loading' | 'error'>(config.ssr ? 'ok' : 'loading')
  
  
  if (skeleton) return (
    <S.Wrap loading={'1'}>
      <Skeleton className='skeleton-load-image-card'/>
    </S.Wrap>
  )
  
  
  return (
    <S.Wrap loading={(isLoad === 'loading') ? '1' : '0'}>
      <Skeleton className='skeleton-load-image-card'/>
      <S.Image
        onLoad={() => setIsLoad('ok')}
        visible = {(isLoad === 'ok') ? '1' : '0'}
        alt={title}
        src={src}
      />
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div<{ loading: '1' | '0' }>`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    
    & .skeleton-load-image-card{
      visibility: ${({ loading }) => loading === '1' ? 'visible' : 'hidden'};
    }
`,
  
  Image: styled.img<{ visible: '1' | '0' }>`
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    visibility: ${({ visible }) => visible === '1' ? 'visible' : 'hidden'};
`
}
