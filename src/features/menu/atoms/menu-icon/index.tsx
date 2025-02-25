import React from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { $setShowMainMenu, $showMainMenu } from '../../store'
import styles from './styles.module.scss'


export function MenuIcon() {
  const showMainMenu = useStore($showMainMenu)
  const setShowMainMenu = useEvent($setShowMainMenu)

  return (
    <div className={`${styles.Menu} ${showMainMenu ? styles.menu_open : styles.menu_close}`}>
      <input
        checked={showMainMenu}
        readOnly={true}
        onChange={() => setShowMainMenu()}
        id = 'checkbox3'
        type="checkbox"
        className={`${styles.checkbox3} ${styles.visuallyHidden}`}
      />

      <label htmlFor="checkbox3">
        <div className={`${styles.hamburger} ${styles.hamburger3}`}>
          <span className={`${styles.bar} ${styles.bar1}`}/>
          <span className={`${styles.bar} ${styles.bar2}`}/>
          <span className={`${styles.bar} ${styles.bar3}`}/>
          <span className={`${styles.bar} ${styles.bar4}`}/>
        </div>
      </label>

    </div>
  )
}
