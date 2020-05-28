import { namesCategory } from '../../constants/category-keys'


export const filtersMap = {
  brands: 'Бренды',
  categories: 'Категории',
  colors: 'Цвета',
  sizes: 'Размеры',
  prices: 'Цена',
  sales: 'Скидка',
  favorite: 'Топовые'
} as const


export type SexId = 1 | 2

export type ViewFilter = {
  sexId: SexId,
  type: 'list-translate',
  data: Array<keyof typeof namesCategory['1' | '2']>,
  title: keyof typeof filtersMap,

  isFirst?: boolean,
} | {
  sexId: SexId,
  type: 'range',
  data:  [number, number] | [ number, null ] | [ null, number ],
  title: keyof typeof filtersMap,

  isFirst?: boolean,
} | {
  sexId: SexId,
  type: 'list',
  data: Array<string>,
  title: keyof typeof filtersMap,

  isFirst?: boolean,
}
