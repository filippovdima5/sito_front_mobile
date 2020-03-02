import React, {useEffect} from 'react'
import {  fetchUser, $genderInfo } from '../../../stores/env'
import styles from './styles.module.scss'
import { useStore } from '../../../helpers/hooks/use-effector-store'
import {Redirect} from 'react-router'
import { sexIdToStr } from '../../../helpers/lib'
import { Link } from 'react-router-dom'


const data = [
  { index: 2, title: 'Для женщин' },
  { index: 1, title: 'Для мужчин' },
] as const


export function GenderDetected({ height }: {height: number}) {
  useEffect(() => {fetchUser()}, [])
  const genderInfo = useStore($genderInfo)
  
  if (genderInfo !== null) return <Redirect to={`/${sexIdToStr(genderInfo?.sexId)}`}/>
  
  
  return (
    <>
      {data.map(({ index, title }) => (
        <Link to={`/${sexIdToStr(index)}`} key={index} className={styles.genderWrap}>
          <div style={{ paddingTop: `${height}%` }} className={styles.gender}>
            <img src={`/`} alt={title} className={styles.img}/>

            <div className={styles.titleWrap}>
              <div className={styles.title}>{title}</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

