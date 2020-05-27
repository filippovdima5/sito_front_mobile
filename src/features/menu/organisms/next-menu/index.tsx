import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useStore, useEvent } from 'effector-react/ssr'
import { $showNextMenu, setShowNextMenu, $showMainMenu, setShowMainMenu } from '../../store'
import { setSignalWithoutSexId } from '../../molecules/header'

import { subId, categories, subcategories } from '../../constants'
import { sexIdToStr } from '../../../../lib'

import { Arrow } from '../../../../media/img/svg/icons'
import styles from './styles.module.scss'


export function NextMenu({ sexId }: {sexId: 1 | 2 | 0}) {
  const showNextMenu = useStore($showNextMenu)
  const showMainMenu = useStore($showMainMenu)
  const setShowMainMenuEv = useEvent(setShowMainMenu)
  const setShowNextMenuEv = useEvent(setShowNextMenu)
  const setSignalWithoutSexIdEv = useEvent(setSignalWithoutSexId)

  const [ title, setTitle ] = useState(showNextMenu === null ? '' : subcategories[showNextMenu])
  const [ sub, setSub ] = useState(showNextMenu === null ? 'clothes' : showNextMenu)
  
  useEffect(() => {
    if (showNextMenu !== null) {
      setTitle(subcategories[showNextMenu])
      setSub(showNextMenu)
    }
  }, [showNextMenu])

  useEffect(() => {
    let timer: any
    if (!showMainMenu) timer = setTimeout(() => setShowNextMenuEv(null), 300)

    return () => {clearTimeout(timer)}
  }, [showMainMenu, setShowNextMenuEv])

  return (
    <>
      <div
        className={`${styles.nextMenu} ${showNextMenu !== null ? styles.nextMenuOpen : styles.nextMenuClose }`}
      >

        <h2
          onClick={() => setShowNextMenuEv(null)}
          className={styles.header}
        >
          <Arrow className={styles.img}/>
          <span className={styles.span}>
            {title}
          </span>
        </h2>
        
        
        <div className={styles.body}>
          <ul className={styles.ul}>
            {
              Object.entries(categories[sexId][sub]).map(([key, value]) => (
                <Link
                  key={key}
                  className={styles.li}
                  to={`/products/${sexId === 0 ? '' : sexIdToStr(sexId)}?categories=${key}`}
                  onClick={() => {
                    if (sexId !== 0){
                      setShowMainMenuEv()
                    } else {
                      setSignalWithoutSexIdEv()
                    }
                  }}
                >
                  <span className={styles.link}>
                    {value}
                  </span>
                </Link>
              ))
            }
            <Link
              to={`/products/${sexId === 0 ? '' : sexIdToStr(sexId)}?categories=${subId[sub]}`}
              className={styles.li}
              onClick={() => {
                if (sexId !== 0){
                  setShowMainMenuEv()
                } else {
                  setSignalWithoutSexIdEv()
                }
              }}
            >
              <span className={styles.link}>Прочее</span>
            </Link>
          </ul>

          <div className={styles.space}/>
        </div>

      </div>


      <div className={`${styles.backLogNextMenu} ${showNextMenu !== null ? styles.backLogNextMenuOpen : styles.backLogNextMenuClose}`}/>
    </>
  )
}
