import React from 'react'
import rightArrowSVG from '../../../../media/img/svg/rightArrow.svg'
import styles from './styles.module.scss'



const filtersMap = {
  brands: 'Бренды',
  categories: 'Категории',
  colors: 'Цвета',
  sizes: 'Размеры',
  prices: 'Цена',
  sales: 'Скидка',
  favorite: 'Топовые'
} as const



// todo: Потом нужно будет сделать их одним компонентом, с оберткоцй
export function UnuseFilterRow({ title }: { title: keyof typeof filtersMap }) {
  return (
    <div className={styles.filterRow}>
      <div className={styles.item_wrap}>

        <div className={styles.item}>
          <div className={styles.item_text_wrap}>
            <div className={styles.title_filter_wrap}>
              <div>{filtersMap[title]}</div>
            </div>
            <div className={styles.active_filters_wrap}/>
          </div>
          <div className={styles.item_arrow_wrap}>
            <img src={rightArrowSVG} alt={'go'} className={styles.svg}/>
          </div>
        </div>

      </div>
    </div>
  )
}
