import React from 'react'
import { SexId } from '../../../../types'
import styles from './styles.module.scss'


type Props = {
  sexId: 1 | 2,
  currentSex: SexId,
}


export function ButtonSex({ sexId,  currentSex }: Props) {
  return(
    <>
      <button className={`${styles.button}`}>{sexId === 1 ? 'Мужское' : 'Женское'}</button>
      <div className={`${styles.bottomLine} ${sexId === currentSex ? styles.bottomLine_true : styles.bottomLine_false}`}/>
    </>
  )
}
