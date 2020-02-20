import React from 'react'
import { useStore } from 'effector-react'
import { showMenuWindow , $isShowMenu } from '../../components/Menu/menuStore'
import styles from './styles.module.scss'


export function Menu() {
  const isShowMenu = useStore($isShowMenu)
  const handleChange = () => {showMenuWindow()}

  return (
    <div className={`${styles.Menu} ${isShowMenu ? styles.menu_open : styles.menu_close}`}>
      <input
        checked={isShowMenu}
        readOnly={true}
        onChange={handleChange}
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


      {/*<div className={styles.backLog}/>*/}
    </div>
  )
}
