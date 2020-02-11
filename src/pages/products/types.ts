export type MainState = {
  sexId: 1 | 2 | null,
  categories: Array<number> | null,
  brands: Array<string> | null,
  sizes: Array<string> | null,
  colors: Array<string> | null,
  price_from: number | null,
  price_to: number | null,
  sale_from: number | null,
  sale_to: number | null,
  favorite: boolean | null,
  page: number | null,
  sort: 'update_up' | 'price_up' | 'sale_up' | null,
  limit: number | null,
}



export type AfterDecodeUrl = {
  sexId: 1 | 2,
  categories?: Array<number>,
  brands?: Array<string>,
  sizes?: Array<string>,
  colors?: Array<string>,

  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,

  favorite?: boolean,

  page?: number,
  sort?: 'update_up' | 'price_up' | 'sale_up',
}

