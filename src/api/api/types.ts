import { categoryKeys } from '../../constants/category-keys'

//region Env:
export interface SexId {
  sexId: 1 | 2,
}

export interface EnvDataItem  {
  title: string,
  img: string,
  url: string,
}

export interface Env {
  sex_id: 1 | 2 | null,
  brands: Array<EnvDataItem>,
  partners: Array<EnvDataItem>,
  clothes: Array<keyof typeof categoryKeys['1']['clothes'] | keyof typeof categoryKeys['2']['clothes']> | null,
  shoes: Array<keyof typeof categoryKeys['1']['shoes'] | keyof typeof categoryKeys['2']['shoes']> | null,
  accessories: Array<keyof typeof categoryKeys['1']['accessories'] | keyof typeof categoryKeys['2']['accessories']> | null,
}
// endregion Env


// region Products:
export interface ShortProduct {
  id: string,
  title: string,
  url: string,
  img: Array<string>,
  brand: string,
  price: number,
  oldprice: number,
  sale: number,
}

export interface PaginateInfo {
  total: number,
  total_pages: number,
}

export interface ProductsReqParams {
  sex_id: 1 | 2,
  brands?: Array<string>,
  categories?: Array<number>,
  sizes?: Array<string>,
  colors?: Array<string>,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,

  page: number,
  sort: 'update_up' | 'price_up' | 'sale_up',
  limit: number,

  favorite?: boolean,
}

export interface ProductsRequest {
  products: Array<ShortProduct>,
  info: PaginateInfo,
}

export interface FiltersItemString {
  value: string,
  count: number,
  available: boolean,
}

export interface FiltersItemNumber {
  value: number,
  count: number,
  available: boolean,
}

export interface FiltersRequest {
  categories: Array<FiltersItemNumber>,
  brands: Array<FiltersItemString>,
  sizes: Array<FiltersItemString>,
  colors: Array<FiltersItemString>,
  price_from: number,
  price_to: number,
  sale_from: number,
  sale_to: number,

  favorite?: boolean,
}

export interface FilterReqParams {
  sex_id: 1 | 2,
  brands?: Array<string>,
  categories?: Array<number>,
  sizes?: Array<string>,
  colors?: Array<string>,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,

  favorite?: boolean,
}
// endregion
