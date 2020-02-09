export type FiltersState = {
  categories: Array<number> | null,
  brands: Array<string> | null,
  sizes: Array<string> | null,
  colors: Array<string> | null,
  price_from: number | null,
  price_to: number | null,
  sale_from: number | null,
  sale_to: number | null,
  favorite: boolean | null,
}


export type AfterParseUrl = {
  sexId: 1 | 2,
  categories?: Array<number>,
  brands?: Array<string>,
  sizes?: Array<string>,
  colors?: Array<string>,

  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,
  page?: number,

  sort?: 'update_up' | 'price_up' | 'sale_up',
  favorite?: boolean,
}