import { categoryKeys } from '../../constants/category-keys'

// env:
export interface Partners  {
  title: string,
  img: string,
  url: string,
}

export interface Brands  {
  title: string,
  img: string,
  url: string,
}

export interface Env {
  sex_id: 1 | 2 | null,
  brands: Array<Brands>,
  partners: Array<Partners>,
  clothes: Array<keyof typeof categoryKeys['1']['clothes'] | keyof typeof categoryKeys['2']['clothes']> | null,
  shoes: Array<keyof typeof categoryKeys['1']['shoes'] | keyof typeof categoryKeys['2']['shoes']> | null,
  accessories: Array<keyof typeof categoryKeys['1']['accessories'] | keyof typeof categoryKeys['2']['accessories']> | null,
}
