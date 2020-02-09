type Sort = 'update_up' | 'price_up' | 'sale_up'


export type MainState = {
  sex_id: 1 | 2 | 0,
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
  sex_id: 1 | 2 | 0,
  index: 'categories',
  value: Array<number>,
} | {
  sex_id: 1 | 2 | 0,
  index: 'favorite' | 'likes',
  value: 1,
}