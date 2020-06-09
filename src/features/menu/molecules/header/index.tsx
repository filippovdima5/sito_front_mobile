import React from 'react'
import { Link } from 'react-router-dom'
import { sexIdToStr } from '../../../../lib'
import { ButtonSex } from '../../atoms/button-sex'
import { SexId } from '../../../../types'
import styles from './styles.module.scss'





export function Header ({ sexId }: { sexId: SexId }) {
  
  return (
    <div className={styles.Header}>
      <div className={styles.border}/>
      {([1, 2] as [1, 2]).map(item => (
        <Link
          to={`/${sexIdToStr(item)}/products`}
          key={item}
          className={styles.buttonWrap}
        >
          <ButtonSex sexId={item}  currentSex={sexId}/>
        </Link>
      ))}
    </div>
  )
}

