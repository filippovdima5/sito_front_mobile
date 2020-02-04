import React from 'react'
import { setSexId } from '../../../stores/user/user'
import { genderDetected } from '../../../constants/home-page'
import styles from './GenderDetected.module.scss'


const data = [
  { index: 2, title: 'Для женщин' },
  { index: 1, title: 'Для мужчин' },
] as const

export function GenderDetected() {

  const handleSetSexId = (sex_id: 1 | 2) => {
    setSexId(sex_id)
    localStorage.setItem('sex_id', sex_id.toString())
  }

  return (
    <>
      {data.map(({ index, title }) => (
        <div onClick = {() => handleSetSexId(index)} key={index} className={styles.genderWrap}>
          <div className={styles.gender}>
            <img src={genderDetected.page[index]} alt={title} className={styles.img}/>

            <div className={styles.titleWrap}>
              <div className={styles.title}>{title}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

