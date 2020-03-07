import React from 'react'
import styles from './styles.module.scss'
import { LikeIcon } from '../../../media/img/svg/icons'
import { Button } from '../../../commons/atoms/button'
import { Link } from 'react-router-dom'


const links = [
  { link: 'men', title: 'Мужское' },
  { link: 'women', title: 'Женское' },
] as const

export function EmptyPage() {
  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.container}>
          <div className={styles.img}/>
          <div className={styles.title}>Не найдено</div>
          <div className={styles.body}>
            <span>
              Нажимайте на кнопку
              <span className={styles.span}>
                 <LikeIcon style={{ stroke: 'rgba(170, 170, 170, 0.54)', fill: 'rgba(170, 170, 170, 0.54)' }}/>
              </span>
              , чтобы сохранять товары в избранные
            </span>
          </div>
          
          <div className={styles.buttons}>
            {links.map(({ link, title }) => (
              <Link
                className={styles.link}
                to={`/products/${link}`}
              >
                <Button title={title}/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
