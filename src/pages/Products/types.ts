import { SexId } from '../../stores/user/types'


type Sort = 'update_up' | 'price_up' | 'sale_up'

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
}