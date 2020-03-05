import React, { useEffect } from 'react'
import { setGender } from '../../stores/env'
import styles from './styles.module.scss'
import { Input } from '../../atoms/input'


type Props = {
  sexId: 1 | 2,
}

export function BrandsPage({ sexId }: Props) {
  useEffect(() => {setGender(sexId)}, [sexId])
  
  
  return (
    <div className={styles.brands}>
      <div className={styles.wrap}>
      
        <div className={styles.search}>
          <Input
            placeholder={'Поиск по названию бренда'}
            type={'text'}
          />
        </div>
        
        <div className={styles.scrollContainer}>
        
        </div>
      
      </div>
    </div>
  )
}
