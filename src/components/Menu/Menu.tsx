import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $sexId } from '../../stores/user/user'
import styles from './Menu.module.scss'
import { Header } from './Header/Header'
import { Body } from './Body/Body'
import { NextMenu } from './NextMenu/animate/NextMenuAnimate'



function Menu() {
  const sexId = useStore($sexId)
  const [categories, setCategories] = useState<Array<string> | null>(null)

  useEffect(() => {
    if (localStorage.getItem('@/env')) setCategories(JSON.parse(localStorage.getItem('@/env') as string).categories)
    else {
      fetch('/api/env')
        .then(res => res.json())
        .then(env => {
          localStorage.setItem('@/env', JSON.stringify(env))
          setCategories(env.categories)
        })
    }
  }, [sexId])

  return (
    <div className={styles.Menu}>
      <Header sexId={sexId}/>
      <Body sexId={sexId}/>
      <NextMenu sex_id = {sexId} categories = {categories && categories[sexId]}/>
    </div>
  )
}

export { Menu }