import React, { useEffect } from 'react'
import { setGender } from '../../stores/env'
import styles from './styles.module.scss'


type Props = {
  sexId: 1 | 2,
}

export function BrandsPage({ sexId }: Props) {
  useEffect(() => {setGender(sexId)}, [sexId])
  
  
  return (
    <div className={styles.brands}>
      <div className={styles.wrap}>
        {sexId } BRANDS
      </div>
    </div>
  )
}
