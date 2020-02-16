import React from 'react'
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

type Props = {
  title: keyof typeof filtersMap,
  check: boolean,
  event: () => void,
}

export function CheckRow(props: Props) {
  return (
    <label className={`${styles.checkRow} ${props.check && styles.disabled}`}>
      <input
        readOnly={true}
        checked={props.check}
        onClick={props.event}
        disabled={props.check}
        type={'checkbox'}
        className={styles.checkbox}
      />
      <span className={styles.icon}/>
      <span className={styles.title}>{filtersMap[props.title]}</span>
    </label>
  )
}
