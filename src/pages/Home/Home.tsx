import React from 'react'
import { useStore } from 'effector-react'
import { $genderInfo } from '../../stores/env'
import styles from './Home.module.scss'
import { GenderDetected } from './GenderDetected/GenderDetected'
import { HomePage } from './HomePage/HomePage'


function HomeWrap() {
  const genderInfo = useStore($genderInfo)

  if (genderInfo === null) return <GenderDetected height={66}/>
  else return <HomePage sexId = {genderInfo.sexId}/>
}


export function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.wrap}>
        <HomeWrap/>
      </div>
    </div>
  )
}
