import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { $showNextMenu, setShowNextMenu, $showMainMenu, setShowMainMenu } from '../../store'
import { useStore } from '../../../../helpers/hooks/use-effector-store'
import leftArrow from '../../../../media/img/svg/leftArrow.svg'
import { subId, categories, subcategories } from '../../constants'
import { sexIdToStr } from '../../../../helpers/lib'
import { setCategories } from '../../../products/filters/store'
import styles from './styles.module.scss'



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
          <img src={leftArrow} alt={'back'} className={styles.img}/>
          <span className={styles.span}>
            {title}
          </span>
        </h2>
        
        
        <div className={styles.body}>
          <ul className={styles.ul}>
            {
              Object.entries(categories[sexId][sub]).map(([key, value]) => (
                <Link
                  to={`/products/${sexIdToStr(sexId)}?categories=${key}`}
                  key={key}
                  className={styles.li}
                  onClick={() => {
                    setCategories({ value: Number(key) })
                    setShowMainMenu()
                  }}
                >
                  <span className={styles.link}>
                    {value}
                  </span>
                </Link>
              ))
            }
            <Link
              to={`/products/${sexIdToStr(sexId)}?categories=${subId[sub]}`}
              className={styles.li}
              onClick={() => {
                setCategories({ value: Number(subId[sub]) })
                setShowMainMenu()
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
