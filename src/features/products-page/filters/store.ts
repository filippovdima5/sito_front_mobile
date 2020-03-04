import { createEvent, restore } from 'effector'
import { namesCategory } from '../../../constants/category-keys'
import { filtersState, mainState, setTypeSet } from '../store'
import { MainState } from '../types'
import { filtersMap } from './types'


export const setShowFilters = createEvent<boolean>()
export const $showFilters = restore(setShowFilters, false)

export const setShowFilter = createEvent< keyof typeof filtersMap | null>()
export const $showFilter = restore(setShowFilter, null)


export const skipAllFilters = createEvent()
mainState.on(skipAllFilters, state => {
  setTypeSet({ type: 'set_filter' })
  return ({
    ...state,
    sizes: null,
    colors: null,
    brands: null,
    price_to: null,
    price_from: null,
    sale_to: null,
    sale_from: null,
    favorite: null,
    categories: null,
  })
})

export const setCategories = createEvent<{ value: number, sexId: 1 | 2}>()
mainState.on(setCategories, (state, { value, sexId }) => {
  setTypeSet({ type: 'set_filter' })
  return ({ ...mainState.defaultState, sexId, categories: [value] })
})

export const skipThisFilter = createEvent<{key:  keyof Omit<MainState, 'sort' | 'limit' | 'page' | 'sexId'>}>()
mainState.on(skipThisFilter, (state, { key }) => {
  setTypeSet({ type: 'set_filter' })
  return ({ ...state, [key]: null })
})

export const $filtersViewRecord = filtersState.map(state => ({
  categories: state.categories,
  brands: state.brands,
  sizes: state.sizes,
  colors: state.colors,
  favorite: state.favorite,
  prices: (state.price_from !== null || state.price_to !== null) ? [state.price_from, state.price_to] : null,
  sales: (state.sale_from !== null || state.sale_to !== null) ? [state.sale_from, state.sale_to] : null,
}))

export const $filtersView = $filtersViewRecord.map(state => Object.entries(state)
  //eslint-disable-next-line
  .map(([key, value]) => {
    const index: keyof typeof state = key as keyof typeof state
    switch (index) {
      case 'categories': return ({
        name: index,
        data: value as  Array<keyof typeof namesCategory['1' | '2']> | null,
        type: 'list-translate' as 'list-translate'
      })
      case 'brands':
      case 'sizes':
      case 'colors': return ({
        name: index,
        data: value as Array<string> | null,
        type: 'list' as 'list'
      })
      case 'prices':
      case 'sales': return ({
        name: index,
        data: value as [number, number] | null,
        type: 'range' as 'range'
      })
      case 'favorite': return ({
        name: index,
        data: value as boolean | null,
        type: 'bool' as 'bool'
      })
    }
  })
)











