import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import { $genderInfo, fetchUser } from '../../stores/env'
import { GenderDetected } from '../../features/home-page/gender-detected'
import { HomePage } from '../../features/home-page'
import styles from './styles.module.scss'



function HomeWrap() {
  useEffect(() => { fetchUser() }, [])
  
  const genderInfo = useStore($genderInfo)
  
  if (genderInfo !== null)  {
    const { sexId } = genderInfo
    return <HomePage sexId = {sexId}/>
  }
  else return <GenderDetected height={66}/>
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
