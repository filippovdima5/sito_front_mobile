import React, { useMemo } from 'react'
import { useLocation , Link } from 'react-router-dom'
import { useStore,  useEvent } from 'effector-react/ssr'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { findSexIdInPath, sexIdToStr } from '../../../lib'
import { $showMainMenu, $setShowMainMenu, $setShowNextMenu, $showNextMenu } from '../store'
import { MenuIcon } from '../atoms/menu-icon'
import {  NEXT_MENU_ID } from '../organisms/next-menu'
import { Header } from '../molecules/header'
import { useEffectSafe } from '../../../hooks/use-effect-safe'
import { Arrow } from '../../../assets/svg'
import styles from './styles.module.scss'



const MAIN_MENU_ID = 'MAIN_MENU_ID'


const menuItems = [
  { title: 'Одежда', index: 'clothes', link: false, arrow: true },
  { title: 'Обувь', index: 'shoes', link: false, arrow: true },
  { title: 'Аксессуары', index: 'accessories', link: false, arrow: true },
  { title: 'Бренды', index: 'brands', link: true, arrow: false },
  { title: 'Избранное', index: 'private-office', link: true, arrow: false },
  { title: 'О нас', index: 'about', link: true, arrow: false }
] as const

export function Menu() {
  const showMainMenu = useStore($showMainMenu)
  const showNextMenu = useStore($showNextMenu)
  
  const setShowMainMenu = useEvent($setShowMainMenu)
  const setShowNextMenu = useEvent($setShowNextMenu)
  
  
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPath(pathname), [pathname])
  
  useEffectSafe(() => {
    if (!showMainMenu) clearAllBodyScrollLocks()
    else disableBodyScroll(document.getElementById(MAIN_MENU_ID) as HTMLElement)
  }, [showMainMenu])
  
  useEffectSafe(() => {
    if (Boolean(showNextMenu)) disableBodyScroll(document.getElementById(NEXT_MENU_ID) as HTMLElement)
    // else enableBodyScroll(document.getElementById(NEXT_MENU_ID) as HTMLElement)
  }, [showNextMenu])
  
  if (pathname === '/') return null
  
  return(
    <>
      <div className={`${styles.mainMenu} ${showMainMenu ? styles.mainMenuOpen : styles.mainMenuClose}`}>
        <Header sexId={sexId}/>

        <div className={styles.iconMenu}>
          <MenuIcon/>
        </div>
        
        
        <nav id={MAIN_MENU_ID}  className={styles.nav}>
          {sexId !== null && <h2 className={styles.h2}>{sexId === 1 ? 'Для него' : 'Для неё'}</h2>}
          <ul className={styles.ul}>
            { menuItems.map(({ arrow, link, index, title }) => {
              if (link) return (
                (
                  <Link to={`/${sexIdToStr(sexId)}/${index}`} onClick={() => setShowMainMenu()} key={index} className={styles.li}>
                    <span className={styles.link}>
                      {title}
                      { arrow && <Arrow rotate={-90} className={styles.arrow}/> }
                    </span>
                  </Link>
                )
              )
              return (
                (
                  <li onClick={() => setShowNextMenu({ index, title })} key={index} className={styles.li}>
                    <span className={styles.link}>
                      {title}
                      { arrow && <Arrow rotate={-90} className={styles.arrow}/> }
                    </span>
                  </li>
                )
              )
            }) }
            
          </ul>
      
          
          <div className={styles.space}/>
        </nav>
       
      </div>

      <div
        onClick={() => setShowMainMenu()}
        className={`${styles.backLogMainMenu} ${showMainMenu ? styles.backLogMainMenuOpen : styles.backLogMainMenuClose}`}
      />
    </>
  )
}
