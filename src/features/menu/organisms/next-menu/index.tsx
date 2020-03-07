import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { $showNextMenu, setShowNextMenu, $showMainMenu, setShowMainMenu } from '../../store'
import { useStore } from '../../../../helpers/hooks/use-effector-store'
import { subId, categories, subcategories } from '../../constants'
import { sexIdToStr } from '../../../../helpers/lib'
import { setCategories } from '../../../products-page/features/filters/store'
import styles from './styles.module.scss'
import { Arrow } from '../../../../media/img/svg/icons'
import { setSignalWithoutSexId } from '../../molecules/header'


export function NextMenu({ sexId }: {sexId: 1 | 2 | 0}) {
  const showNextMenu = useStore($showNextMenu)
  const showMainMenu = useStore($showMainMenu)

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
    if (!showMainMenu) timer = setTimeout(() => setShowNextMenu(null), 300)

    return () => {clearTimeout(timer)}
  }, [showMainMenu])

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
            {title}
          </span>
        </h2>
        
        
        <div className={styles.body}>
          <ul className={styles.ul}>
            {
              Object.entries(categories[sexId][sub]).map(([key, value]) => (
                <Link
                  // todo: Нужно исправить случай, когда унисекс, то вести на /products? .... (без men or women)
                  to={`/products/${sexId === 0 ? '' : sexIdToStr(sexId)}?categories=${key}`}
                  key={key}
                  className={styles.li}
                  onClick={() => {
                    if (sexId !== 0){
                      setCategories({ value: Number(key), sexId })
                      setShowMainMenu()
                    } else {
                      setSignalWithoutSexId()
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
                  setCategories({ value: Number(subId[sub]), sexId })
                  setShowMainMenu()
                } else {
                  setSignalWithoutSexId()
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
