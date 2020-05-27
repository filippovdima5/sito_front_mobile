import { SexId } from '../../types'
import { unisexCategoryKeys } from '../../constants'
import { sortTypes } from './constants'


export interface QueryFields  {
  sex_id?: SexId,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,
  page?: number,
  limit?: number,
  brands?: Array<string>,
  sizes?: Array<string>,
  categories?: Array<keyof typeof unisexCategoryKeys> | Array<number>,
  sort?: keyof typeof sortTypes,
  not_size?: boolean,
}

export type AfterDecodeUrl = {
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

