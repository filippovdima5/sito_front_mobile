import React from 'react'
import closeSVG from '../../../../media/img/svg/close.svg'
import styles from './styles.module.scss'


export function FiltersList() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>

        <div className={styles.titleWrap}>
          <div className={styles.title}>Фильтры</div>
        </div>

        <div className={styles.btnWrap}>
          <button className={`${styles.btn} ${styles.right}`}>
            <img
              src={closeSVG}
              className={styles.svg}
              alt={'close'}
            />
          </button>
        </div>

      </div>



      <div className={styles.body}>
        BODY


        <div className={styles.space}/>
      </div>

      

    </div>
  )
}