import React from 'react'
import { Link } from 'react-router-dom'
import { useEvent } from 'effector-react/ssr'
import styles from '../../media/css/info-page.module.scss'
import { LikeIcon } from '../../media/img/svg/icons'
import { Button } from '../../commons/atoms/button'
import { $mountProductsPage } from '../products-page/store'


const links = [
  { link: 'men', title: 'Мужское' },
  { link: 'women', title: 'Женское' },
] as const

export function EmptyPage() {
  const mountProductPage = useEvent($mountProductsPage)
  
  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.container}>
          <div style={{ backgroundImage: 'url("/cdn/mobile/like-page/like-image.svg")' }} className={styles.img}/>
          <div className={styles.title}>Не найдено</div>
          <div className={styles.body}>
            <span>
              Нажимайте на кнопку
              <span className={styles.span}>
                <LikeIcon 
                  style={{ stroke: 'rgba(170, 170, 170, 0.54)', fill: 'rgba(170, 170, 170, 0.54)' }}/>
              </span>
              , чтобы сохранять товары в избранные
            </span>
          </div>
          
          <div className={styles.buttons}>
            {links.map(({ link, title }) => (
              <Link
                onClick={() => mountProductPage({ pathname:`/${link}/products`, search: '' })}
                key={link}
                className={styles.link}
                to={`/${link}/products`}
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
