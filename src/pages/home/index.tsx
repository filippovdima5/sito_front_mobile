import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import { $genderInfo, fetchSexId } from '../../stores/env'
import styles from './styles.module.scss'
import { GenderDetected } from './gender-detected'
import { HomePage } from './home-page'



function HomeWrap() {
  useEffect(() => {fetchSexId()}, [])
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
