import React, { useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
// @ts-ignore
import { disableBodyScroll } from 'body-scroll-lock'
import { $nextMenuState, showMenuWindow } from '../../menuStore'
import { openFromMenu } from '../../../../pages/Products/store'
import styles from './Body.module.scss'


type Props = {
  categories: Array<string>,
  sex_id: 1 | 2 | 0,
}

function Body({ categories , sex_id }: Props) {
  const { index } = useStore($nextMenuState)
  const nextMenuRef = useRef(document.getElementById('nextMenu'))


  useEffect(() => {
    nextMenuRef.current = document.getElementById('nextMenu')
    disableBodyScroll(nextMenuRef.current)
  }, [])


  return (
    <nav id = {'nextMenu'} className={styles.Body}>
      <ul className={styles.ul}>
        {
          index && Object.entries(categories[index]).map(([key, title]) => (
            <li
              onClick={() => {
                openFromMenu({ sex_id, index: 'categories', value: [+key] })
                showMenuWindow()
              }}
              key={key}
              className={styles.li}
            >
              <span className={styles.link}>
                {title}
                {/*<img className={styles.img} src={arrowRight} alt={'go'}/>*/}
              </span>
            </li>
          ))
        }
        <li
          onClick={() => {
            !!index && openFromMenu({ sex_id, index: 'categories', value: [index] })
            showMenuWindow()
          }}
          className={styles.li}>
          <span className={styles.link}>
                             Прочее
            {/*<img className={styles.img} src={arrowRight} alt={'go'}/>*/}
          </span>
        </li>
      </ul>

      <div className={styles.space}/>
    </nav>
  )
}

export { Body }