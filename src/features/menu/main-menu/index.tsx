import React from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon } from '../atoms/menu-icon'
import { $showMainMenu, setShowMainMenu, setShowNextMenu } from '../store'
import { useStore } from '../../../helpers/hooks/use-effector-store'
import { NextMenu } from '../organisms/next-menu'
import { Header, setSignalWithoutSexId } from '../molecules/header'
//import { Footer } from '../molecules/footer'
import { $sexId } from '../../../stores/env'
import { categories, menuLinks } from '../constants'
import styles from './styles.module.scss'
import { Arrow } from '../../../media/img/svg/icons'


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

const mainList: Array<LinkItem> = [
  { index: 'brands', link: '/brands' },
  { index: 'likes', link: '/likes' },
]

const infoList: Array<LinkItem> = [
  { index: 'blog', link: '/blog' },
  { index: 'about', link: '/about' }
]


export function Menu() {
  const sexId = useStore($sexId)
  const showMainMenu = useStore($showMainMenu)

  return(
    <>
      <div className={`${styles.mainMenu} ${showMainMenu ? styles.mainMenuOpen : styles.mainMenuClose}`}>
        <Header sexId={sexId === null ? 0 : sexId}/>

        <div className={styles.iconMenu}>
          <MenuIcon/>
        </div>

        <nav className={styles.nav}>


          {sexId === null ?
            <div
              onClick={(event: any) => {
                event.stopPropagation()
                setSignalWithoutSexId()
              }}
              className={styles.blockNoSex}
            />
            :
            <h2 className={styles.h2}>{sexId === 1 ? 'Для него' : 'Для неё'}</h2>
          }


          <ul className={styles.ul}>
            {catalogList.map(({ title, index }) => (
              <li
                onClick={() => setShowNextMenu(index)}
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
            {mainList.map(({ index, link }) => (
              <Link
                key = {index}
                to={link}
                onClick={() => setShowMainMenu()}
                className={styles.li}
              >
                <span className={styles.link}>{menuLinks[index]}</span>
              </Link>
            ))}
          </ul>

          <ul className={styles.ul}>
            {infoList.map(({ index, link }) => (
              <Link
                key = {index}
                to={link}
                onClick={() => setShowMainMenu()}
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
        onClick={() => setShowMainMenu()}
        className={`${styles.backLogMainMenu} ${showMainMenu ? styles.backLogMainMenuOpen : styles.backLogMainMenuClose}`}
      />
    </>
  )
}
