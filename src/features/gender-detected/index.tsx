import React from 'react'
import { Link } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import { sexIdToStr } from '../../helpers/lib'

import { $setGender } from '../../stores/user'
import { $baseLink } from '../../stores/env'


import styles from './styles.module.scss'


const data = [
  { index: 2, title: 'Для женщин' },
  { index: 1, title: 'Для мужчин' },
] as const




export function GenderDetected() {
  
  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        {data.map(({ index, title }) => (
          <Link
            to={`/`}
            key={index}
            className={styles.genderWrap}
          >
            <div style={{ paddingTop: '66%' }} className={styles.gender}>
              <img src={`/cdn/mobile/gender-detected/${index}.jpg`} alt={title} className={styles.img}/>

              <div className={styles.titleWrap}>
                <div className={styles.title}>{title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

