import React from 'react'
import { setGender } from '../../../stores/env'
import styles from './GenderDetected.module.scss'



const data = [
  { index: 2, title: 'Для женщин' },
  { index: 1, title: 'Для мужчин' },
] as const

export function GenderDetected({ height }: {height: number}) {

  const handleSetSexId = (sex_id: 1 | 2) => setGender(sex_id)

  return (
    <>
      {data.map(({ index, title }) => (
        <div onClick = {() => handleSetSexId(index)} key={index} className={styles.genderWrap}>
          <div style={{ paddingTop: `${height}%` }} className={styles.gender}>
            <img src={`http://localhost:8080/images/genderDetected/page/${index}.jpg`} alt={title} className={styles.img}/>

            <div className={styles.titleWrap}>
              <div className={styles.title}>{title}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

