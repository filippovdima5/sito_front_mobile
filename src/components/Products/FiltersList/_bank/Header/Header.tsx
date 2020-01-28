import React from 'react'

import closeSVG from '../../../../../media/img/svg/close.svg'
import leftArrowSVG from '../../../../../media/img/svg/leftArrow.svg'
import styles from './Header.module.scss'

// todo: Типизация!
function Header({ title, close, prev }: {title: string, close?: any, prev?: any}) {

  return (
    <div className={styles.Header}>
      <div className={styles.title_wrap}>
        {
          prev &&
                    <div className={styles.btn_wrap}>
                      <button onClick={prev} className={`${styles.btn} ${styles.left}`}>
                        <img src={leftArrowSVG} alt={'back'} className={styles.svg}/>
                      </button>
                    </div>
        }

        <div className={styles.text_wrap}>
          <div className={styles.text}>{title}</div>
        </div>

        {
          close &&
                    <div className={styles.btn_wrap}>
                      <button onClick={close} className={`${styles.btn} ${styles.right}`}>
                        <img src={closeSVG} className={styles.svg} alt={'close'}/>
                      </button>
                    </div>
        }
      </div>
    </div>
  )
}

export { Header }