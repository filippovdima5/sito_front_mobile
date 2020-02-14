import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import { $genderInfo, fetchSexId } from '../../stores/env'
import { GenderDetected } from '../../features/home-page/gender-detected'
import { HomePage } from '../../features/home-page'
import styles from './styles.module.scss'



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
