import React from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon } from '../atoms/menu-icon'
import { $showMainMenu, setShowMainMenu, setShowNextMenu } from '../store'
import { useStore,  useEvent } from 'effector-react/ssr'
import { NextMenu } from '../organisms/next-menu'
import { Header } from '../molecules/header'
import { $sexId } from '../../../stores/env2'
import { categories, menuLinks } from '../constants'
import styles from './styles.module.scss'
import { Arrow } from '../../../media/img/svg/icons'
import {sexIdToStr} from '../../../helpers/lib'
//import { Footer } from '../molecules/footer'


type LinkItem = {
  link: '/about' | '/brands' | '/likes' | '/blog',
  index: keyof typeof menuLinks,
}

type ListItem = {
  title: string,
  index: keyof typeof categories[0 | 1 | 2],
}


const catalogList: Array<ListItem> = [
  { title: 'Одежда', index: 'clothes' },
  { title: 'Обувь', index: 'shoes' },
  { title: 'Аксессуары', index: 'accessories' }
]


const infoList: Array<LinkItem> = [
  { index: 'blog', link: '/blog' },
  { index: 'about', link: '/about' }
]

export function Menu() {
  const sexId = useStore($sexId)
  const showMainMenu = useStore($showMainMenu)
  const setShowMainMenuEv = useEvent(setShowMainMenu)
  const setShowNextMenuEv = useEvent(setShowNextMenu)
  

  return(
    <>
      <div className={`${styles.mainMenu} ${showMainMenu ? styles.mainMenuOpen : styles.mainMenuClose}`}>
        <Header sexId={sexId === null ? 0 : sexId}/>

        <div className={styles.iconMenu}>
          <MenuIcon/>
        </div>

        <nav className={styles.nav}>
          {sexId !== null && <h2 className={styles.h2}>{sexId === 1 ? 'Для него' : 'Для неё'}</h2>}


          <ul className={styles.ul}>
            {catalogList.map(({ title, index }) => (
              <li
                onClick={() => setShowNextMenuEv(index)}
                key={index}
                className={styles.li}
              >
                <span className={styles.link}>
                  {title}
                  <Arrow className={styles.img} rotate={180}/>
                </span>
              </li>
            ))}
          </ul>


          <ul className={styles.ul}>
            <Link
              to={`/brands/${sexId !== null ? sexIdToStr(sexId) : ''}`}
              onClick={() => setShowMainMenuEv()}
              className={styles.li}
            >
              <span className={styles.link}>{menuLinks['brands']}</span>
            </Link>
  
            <Link
              to={'/likes'}
              onClick={() => setShowMainMenuEv()}
              className={styles.li}
            >
              <span className={styles.link}>{menuLinks['likes']}</span>
            </Link>
          </ul>

          <ul className={styles.ul}>
            {infoList.map(({ index, link }) => (
              <Link
                key = {index}
                to={link}
                onClick={() => setShowMainMenuEv()}
                className={styles.li}
              >
                <span className={styles.link}>{menuLinks[index]}</span>
              </Link>
            ))}
          </ul>

          <div className={styles.space}/>
          <NextMenu sexId={sexId === null ? 0 : sexId}/>
        </nav>

        {/*<Footer/>*/}
      </div>

      <div
        onClick={() => setShowMainMenuEv()}
        className={`${styles.backLogMainMenu} ${showMainMenu ? styles.backLogMainMenuOpen : styles.backLogMainMenuClose}`}
      />
    </>
  )
}
