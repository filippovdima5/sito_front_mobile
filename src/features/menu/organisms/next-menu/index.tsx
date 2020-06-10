import React, {  useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import { $showNextMenu, $setShowNextMenu, $showMainMenu, $setShowMainMenu } from '../../store'
import { categories } from '../../constants'
import { findSexIdInPath, sexIdToStr } from '../../../../lib'
import { Arrow } from '../../../../media/img/svg/icons'
import { SexId } from '../../../../types'
import { useEffectSafe } from '../../../../hooks/use-effect-safe'
import { $mountProductsPage } from '../../../products-page/store'
import styles from './styles.module.scss'


export const NEXT_MENU_ID = 'NEXT_MENU_ID'

export function NextMenu() {
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPath(pathname), [pathname])
  const lineSex = useMemo(() => sexIdToStr(sexId), [sexId])
  const mountProductsPage = useEvent($mountProductsPage)
  
  const showNextMenu = useStore($showNextMenu)
  const showMainMenu = useStore($showMainMenu)
  const setShowMainMenu = useEvent($setShowMainMenu)
  const setShowNextMenu = useEvent($setShowNextMenu)
  
  
  const categoryItems = useMemo(() =>
    Object.entries(categories[sexId][!showNextMenu ? 'clothes' : showNextMenu.index as keyof typeof categories[SexId]]), [sexId, showNextMenu])
  
  useEffectSafe(() => {
    if (!showMainMenu) setShowNextMenu(null)
  }, [showMainMenu, setShowNextMenu])

  
  return (
    <>
      <div
        className={`${styles.nextMenu} ${showNextMenu !== null ? styles.nextMenuOpen : styles.nextMenuClose }`}
      >

        <h2
          onClick={() => setShowNextMenu(null)}
          className={styles.header}
        >
          <Arrow className={styles.img}/>
          <span className={styles.span}>
            {showNextMenu?.title}
          </span>
        </h2>
        
        
        <div id={NEXT_MENU_ID} className={styles.body}>
          <ul className={styles.ul}>
            {
              categoryItems.map(([key, value]) => (
                <Link
                  key={key}
                  onClick={() => {
                    setShowMainMenu()
                    mountProductsPage({ pathname: `/${lineSex}/products`, search: `?categories=${key}` })
                  }}
                  className={styles.li}
                  to={`/${lineSex}/products?categories=${key}`}
                >
                  <span className={styles.link}>
                    {value}
                  </span>
                </Link>
              ))
            }
          </ul>
          <div className={styles.space}/>
        </div>
      </div>
      
    </>
  )
}
