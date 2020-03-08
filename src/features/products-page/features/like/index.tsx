import React, { useMemo } from 'react'
import styles from './styles.module.scss'
import { $likes, setLike } from '../../../../stores/env2'
import { useStore } from 'effector-react/ssr'
import { LikeIcon } from '../../../../media/img/svg/icons'

type Props = {
  currentId: string,
}


export function Like({ currentId }: Props) {
  const likeIds = useStore($likes)
  
  
  const isLike = useMemo(() => likeIds.includes(currentId), [likeIds, currentId])
  const fill = useMemo(() => {
    if (isLike) return 'rgba(255, 0, 0, 0.5)'
    return 'rgba(170, 170, 170, 0.54)'
  }, [isLike])
  const stroke = useMemo(() => {
    if (isLike) return 'rgba(255, 0, 0, 0.5)'
    return 'rgba(170, 170, 170, 0.54)'
  }, [isLike])
  
  
  return (
    <span
      onClick={() => setLike(currentId)}
      className={styles.like}
    >
      <LikeIcon style={{ stroke, fill }}/>
    </span>
  )
}


