import React, { useEffect, useState } from 'react'
import { $showNextMenu, setShowNextMenu, $showMainMenu } from '../../store'
import { useStore } from '../../../../helpers/hooks/use-effector-store'
import leftArrow from '../../../../media/img/svg/leftArrow.svg'
import { categories, subcategories } from '../../constants'
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
                <li
                  key={key}
                  className={styles.li}
                >
                  <span className={styles.link}>
                    {value}
                  </span>
                </li>
              ))
            }
            <li
              className={styles.li}>
              <span className={styles.link}>Прочее</span>
            </li>
          </ul>

          <div className={styles.space}/>
        </div>

      </div>


      <div className={`${styles.backLogNextMenu} ${showNextMenu !== null ? styles.backLogNextMenuOpen : styles.backLogNextMenuClose}`}/>
    </>
  )
}
