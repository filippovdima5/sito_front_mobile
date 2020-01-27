import { SexId } from '../../stores/user/types'


type Sort = 'update_up' | 'price_up' | 'sale_up'

// todo: Добавить в типы все возможные номера категорий
export type MainState = {
  sex_id: SexId,
  categories?: Array<number>,
  brands?: Array<string>,
  sizes?: Array<string>,
  colors?: Array<string>,
  prices?: Array<number>,
  sales?: Array<number>,
  sort?: Sort | '',
  page?: number | null,
  favorite?: 1 | null,
  likes?: 1 | null,
}

export type OpenFromMenu = {
  sex_id: SexId,
  index: 'categories',
  value: Array<number>,
} | {
  sex_id: SexId,
  index: 'favorite' | 'likes',
  value: 1,
}