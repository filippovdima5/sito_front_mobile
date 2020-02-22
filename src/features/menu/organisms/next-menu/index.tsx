import React from 'react'
import { $showNextMenu, setShowNextMenu } from '../../store'
import { useStore } from '../../../../helpers/hooks/use-effector-store'
import styles from './styles.module.scss'



export function NextMenu({ sexId }: {sexId: 1 | 2 | 0}) {
  const showNextMenu = useStore($showNextMenu)

  console.log(sexId)

  return (
    <>
      <ul
        onClick={() => setShowNextMenu(null)}
        className={`${styles.nextMenu} ${showNextMenu !== null ? styles.nextMenuOpen : styles.nextMenuClose }`}/>

      <div className={`${styles.backLogNextMenu} ${showNextMenu !== null ? styles.backLogNextMenuOpen : styles.backLogNextMenuClose}`}/>
    </>
  )
}
