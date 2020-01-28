import { createEvent, restore } from 'effector'
import { filtersState } from '../../../pages/Products/store'
import { booleanCheck } from '../../../helpers/functions/booleanCheck'


const filtersMap = {
  brands: {
    title: 'Бренды',
    type: 'list',
  },
  categories: {
    title: 'Категории',
    type: 'list',
  },
  colors: {
    title: 'Цвета',
    type: 'list',
  },
  sizes: {
    title: 'Размеры',
    type: 'list',
  },
  prices: {
    title: 'Цена',
    type: 'range'
  },
  sales: {
    title: 'Скидка',
    type: 'range'
  },
  favorite: {
    title: 'Товары дня',
    type: 'check'
  },
}



export const setVisFiltersList = createEvent<boolean>()
export const visFiltersList = restore(setVisFiltersList, false)

// todo: Оптимизировать одним проходом
// todo: Типизация
export const $usedFilters = filtersState.map(state => ({
  useFilters: Object.entries(state)
    .filter(([_, value]) => booleanCheck(value))
  // @ts-ignore
    .map(([key, value]) => ({ index: key, title: filtersMap[key].title, type: filtersMap[key].type, value })),
  unUseFilters: Object.entries(state)
    .filter(([_, value]) => !booleanCheck(value))
  // @ts-ignore
    .map(([key, value]) => ({ index: key, title: filtersMap[key].title, type: filtersMap[key].type, value })),
}))


export const clearAllActiveFilters = createEvent()



filtersState.reset(clearAllActiveFilters)





//const openFilter = createEvent<{index: string, title: string, type: 'range' | 'list'}>()



