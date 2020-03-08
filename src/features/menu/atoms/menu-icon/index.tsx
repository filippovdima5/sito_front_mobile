import React from 'react'
import styles from './styles.module.scss'
import { setShowMainMenu, $showMainMenu } from '../../store'
import { useStore, useEvent } from 'effector-react/ssr'


export function MenuIcon() {
  const showMainMenu = useStore($showMainMenu)
  const setShowMainMenuEv = useEvent(setShowMainMenu)

  return (
    <div className={`${styles.Menu} ${showMainMenu ? styles.menu_open : styles.menu_close}`}>
      <input
        checked={showMainMenu}
        readOnly={true}
        onChange={() => setShowMainMenuEv()}
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
