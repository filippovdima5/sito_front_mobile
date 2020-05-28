import { categoryKeys, unisexCategoryKeys } from '../../constants'
import { SexId } from '../../types'


export const sortTypes = {
  create_up: 'Сначала новые',
  sale_up : 'Сначала большие скидки',
  price_down: 'Сначала подешевле',
  price_up: 'Сначала подороже',
  sale_down : 'Сначала скидки поменьше',
} as const


export const defaultFields = {
  sex_id: (1 as SexId),
  limit: 4,
  sort: ('create_up' as keyof typeof sortTypes),
  page: 1,
  categories: ([] as Array<keyof typeof unisexCategoryKeys> | Array<number>),
  brands: ([] as Array<string>),
  sizes: ([] as Array<string>),
  price_from: 1,
  price_to: 30000,
  sale_from: 30,
  sale_to: 99,
  not_size: false
} as const




export const valuesOfFilterButtons = {
  categories: (value: number, sexId: SexId) => `Категория: ${categoryKeys[sexId][value as keyof typeof categoryKeys['1' | '2']]}`,
  brands: (value: string) => `Бренд: ${value}`,
  sizes: (value: string) => `Размер: ${value}`,
  price_from: (value: number) => `Цена: от ${value} RUB`,
  price_to: (value: number) => `Цена: до ${value} RUB`,
  sale_from: (value: number) => `Скидка: от ${value}%`,
  sale_to: (value: number) => `Скидка: до ${value}%`,
}
