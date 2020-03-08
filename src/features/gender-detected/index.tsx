import React, {useEffect} from 'react'
import {  fetchUser, $genderInfo } from '../../stores/env'
import styles from './styles.module.scss'
import { useStore } from 'effector-react/ssr'
import {Redirect} from 'react-router'
import { sexIdToStr } from '../../helpers/lib'
import { Link } from 'react-router-dom'



const data = [
  { index: 2, title: 'Для женщин' },
  { index: 1, title: 'Для мужчин' },
] as const


type PropsGenderDetected = {
  height: number,
  currentRoute: '/home/' | '/products/' | '/404/' | '/brands/',
  search?: string
}


export function GenderDetected({ height, currentRoute, search }: PropsGenderDetected) {
  useEffect(() => {
    fetchUser(null)}, [])
  const genderInfo = useStore($genderInfo)
  
  
  // todo: Нужнали тут эта строка?
  if (genderInfo !== null) return <Redirect to={`${currentRoute}${sexIdToStr(genderInfo?.sexId)}`}/>
  
  
  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
      {data.map(({ index, title }) => (
        <Link to={`${currentRoute}${sexIdToStr(index)}${search ?? ''}`} key={index} className={styles.genderWrap}>
          <div style={{ paddingTop: `${height}%` }} className={styles.gender}>
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

