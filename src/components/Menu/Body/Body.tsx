import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
// @ts-ignore

import arrowRight from '../../../media/img/svg/rightArrow.svg'
import { showMenuWindow , openNextMenu } from '../menuStore'
import { setSignalWithoutSexId } from '../Header/Header'
// import { openFromMenu } from '../../../pages/products/store'
import styles from './Body.module.scss'
import { Footer } from './Footer/Footer'


const catalogList = [
  { title: 'Одежда', index: 1000 },
  { title: 'Обувь', index: 2000 },
  { title: 'Аксессуары', index: 3000 }
]


const mainList = [
  { title: 'Избранное', index: 'favorite' },
  { title: 'Товары дня', index: 'likes' }
]



type Props = {
  sexId: 1 | 2 | 0,
}

function Body({ sexId }: Props) {
  const navRef = useRef(document.getElementById('navRef'))

  // useEffect(() => {
  //   navRef.current = document.getElementById('navRef')
  //   disableBodyScroll(navRef.current)
  //   return () => {clearAllBodyScrollLocks(navRef.current)}
  // }, [])

  return (
    <nav
      id={'navRef'}
      className={styles.Body}
    >
      {
        sexId ?
          <h2 className={styles.h2}>{sexId === 1 ? 'Для него' : 'Для неё'}</h2>
          :
          <div onClick={ () => setSignalWithoutSexId() } className={styles.sexUndefined}/>
      }


      <ul className={styles.ul}>
        {catalogList.map(({ title, index }) => (
          <li
            onClick={() => openNextMenu({ title, index })}
            key={index}
            className={styles.li}
          >
            <span className={styles.link}>
              {title}
              <img className={styles.img} src={arrowRight} alt={'go'}/>
            </span>
          </li>
        ))}
      </ul>


      <ul className={styles.ul}>
        <Link
          to={'/brands'}
          onClick={() => showMenuWindow()}
          key={'brands'}
          className={styles.li}
        >
          <span className={styles.link}>
            Бренды
          </span>
        </Link>
        {mainList.map(({ index, title }) => (
          <li
            onClick={() => {
              //openFromMenu({ sex_id:  1 , index: index === 'likes' ? index : 'favorite', value: 1 })
              showMenuWindow()
            }}
            key={index}
            className={styles.li}>
            <span className={styles.link}>
              {title}
            </span>
          </li>
        ))}
      </ul>

      <ul className={styles.ul}>
        <Link
          to={'/about'}
          onClick={() => showMenuWindow()}
          className={styles.li}>
          <span className={styles.link}>
              О нас
          </span>
        </Link>
      </ul>

      <div className={styles.space}/>
      <Footer/>
    </nav>
  )
}

export { Body }