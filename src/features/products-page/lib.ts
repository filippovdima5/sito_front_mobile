import { categoryKeys } from '../../constants'
import { SexId } from '../../types'
import { QueryFields } from './types'
import { defaultFields } from './constants'


export interface ViewFilterItem { title: string, index: string, label: string }

export const formViewFilterList = (query: Required<QueryFields>): Array<ViewFilterItem> => {
  const { price_to, price_from, sale_to, sale_from, brands, categories, sizes, not_size, sex_id } = query
  const arr: Array<ViewFilterItem> = []
  
  
  const isPriceTo = price_to < defaultFields.price_to
  const isPriceFrom = price_from > defaultFields.price_from
  const isSaleTo = sale_to < defaultFields.sale_to
  const isSaleFrom = sale_from > defaultFields.sale_from
  
  if (isPriceTo || isPriceFrom) {
    arr.push({ index: 'price', title: 'Цена', 
      label: `${isPriceFrom ? `от ${price_from}руб` : ''} ${isPriceTo ? `до ${price_to}руб` : ''}`
    })
  } else arr.push({ index: 'price', title: 'Цена', label: '' })
  
  if (isSaleFrom || isSaleTo) {
    arr.push({ index: 'sale', title: 'Скидка', 
      label: `${isSaleFrom ? `от ${sale_from}%` : ''} ${isSaleTo ? `до ${sale_to}%` : ''}`
    })
  } else arr.push({ index: 'sale', title: 'Скидка',  label: '' })
  
  if (brands.length > 0) {
    arr.push({ index: 'brands', title: 'Бренды',  label: brands.join(', ') })
  } else arr.push({ index: 'brands', title: 'Бренды', label: '' })
  
  const isSize = sizes.length > 0
  if (isSize || not_size) {
    arr.push({
      index: 'sizes', title: 'Размеры',
      label: `${not_size ? `Неизвестный размер${isSize ? ',' : ''}` : ''} ${isSize ? sizes?.join(', ') : ''}`
    })
  } else arr.push({ index: 'sizes', title: 'Размеры', label: '' })
  
  if (categories.length > 0) {
    arr.push({ 
      index: 'categories', title: 'Категории',
      // @ts-ignore
      label: categories.map((i: number) => categoryKeys[sex_id][i as keyof typeof categoryKeys[SexId]]).join(', ')
    })
  } else arr.push({ index: 'categories', title: 'Категории', label: '' })
  
  return arr
}
