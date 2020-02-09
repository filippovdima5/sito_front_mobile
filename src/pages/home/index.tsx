import React from 'react'
import { useStore } from 'effector-react'
import { $genderInfo } from '../../stores/env'
import styles from './styles.module.scss'
import { GenderDetected } from './gender-detected'
import { HomePage } from './home-page'


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
