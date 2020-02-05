import React, { useRef } from 'react'
import { homePage } from '../../../constants/home-page'
import { categoryKeys } from '../../../constants/category-keys'
import styles from './HomePage.module.scss'


type Props = {
  sexId: 1 | 2,
}

type UserHomePage = {
  clothes: Array<keyof typeof categoryKeys['1' | '2']['clothes']>,
  shoes: Array<keyof typeof categoryKeys['1' | '2']['shoes']>,
  accessories: Array<keyof typeof categoryKeys['1' | '2']['accessories']>,
}

const initUserHomePage = (sexId: Props['sexId']) => {
  const save = localStorage.getItem('user_home_page')
  if (save) return JSON.parse(save)
  return homePage[sexId]
}

export function HomePage({ sexId }: Props) {
  const userHomePage = useRef<UserHomePage>(initUserHomePage(sexId)).current

  return (
    <>

    </>
  )
}
