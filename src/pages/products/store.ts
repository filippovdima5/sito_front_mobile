import {combine, createEffect, createEvent, createStore, guard, merge, restore} from 'effector'
import { RouteComponentProps } from 'react-router'
import { setGender, $genderInfo } from '../../stores/env'
import { ProductsReqParams, FilterReqParams } from '../../api/types'
import { api } from '../../api'
import { FiltersState, ProductsState, AfterDecodeUrl } from './types'



//region route_history:
export const initRouteHistory = createEvent<RouteComponentProps['history']>()
const routeHistory = createStore<RouteComponentProps['history'] | null>(null)
routeHistory.on(initRouteHistory, (_, payload) => payload)
//endregion route_history



//region main_state:
const setBlockReplaceAndFetch = createEvent<boolean>()
const blockReplaceAndFetch = restore(setBlockReplaceAndFetch, false)

const filtersState = createStore<FiltersState>({
  categories: null,
  brands: null,
  sizes: null,
  colors: null,
  price_from: null,
  price_to: null,
  sale_from: null,
  sale_to: null,
  favorite: null
})

const productsState = createStore<ProductsState>({
  page: null,
  sort: null,
  limit: null,
})


/**Результаты первичного парсинга URL*/
const setFromDecodeUrl = createEvent<AfterDecodeUrl>()
filtersState.on(setFromDecodeUrl, (state, payload) => ({ ...state, ...payload }))
productsState.on(setFromDecodeUrl, ((state, payload) => ({ ...state, ...payload })))

// endregion main_state



//region set decode_url_state_SET:
routeHistory.updates.watch(state => {
  if (state === null) return undefined
  const { pathname, search } = state.location

  const sex = pathname.split('/products/')[1] as 'men' || 'women'
  const setObject: AfterDecodeUrl = { sexId: sex === 'men' ? 1 : 2 }
  
  try {
    decodeURI(search)
      .split('?')[1]
      .split('&')
      .map(item => (item.split('=')))
      .forEach(([key, value]) => {
        switch (key) {
          case 'categories':
            setObject[key] = value.split('|').map(item => +item)
            break
          case 'brands':
          case 'sizes':
          case 'colors':
            setObject[key] = value.split('|')
            break
          case 'price_from':
          case 'price_to':
          case 'sale_from':
          case 'sale_to':
          case 'page':
            setObject[key] = Number(value)
            break
          case 'sort': {
            if (['update_up', 'price_up', 'sale_up'].includes(value)) setObject[key] = value as 'update_up' | 'price_up' | 'sale_up'
            break
          }
          case 'favorite':
            setObject[key] = true
        }
      })
    // eslint-disable-next-line no-empty
  } catch (e) {}
  finally {
    setFromDecodeUrl(setObject)
    setGender(setObject.sexId)
  }
})
// endregion decode_url_state



// region set event_state_SET:


export const setFilter = createEvent<{key: keyof FiltersState, value: string | number | boolean}>()
export const setProductsState = createEvent<{key: keyof ProductsState, value: 'update_up' | 'price_up' | 'sale_up' | number }>()

blockReplaceAndFetch.on(merge([setFilter, setProductsState]), () => false)

filtersState.on(setFilter, (state, { key, value }) => {
  switch (key) {
    case 'categories': {
      if (state[key] === null) return { ...state, [key]: [Number(value)] }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (state[key]!.includes(Number(key))) return { ...state, [key]: state[key]!.filter(i => i !== value) }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      else return { ...state, [key]: [...state[key]!, Number(value)] }
    }
    case 'brands':
    case 'sizes':
    case 'colors': {
      if (state[key] === null) return { ...state, [key] : Number(value) }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (state[key]!.includes(key.toString())) return { ...state, [key]: state[key]!.filter(i => i !== value) }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      else return { ...state, [key]: [...state[key]!, value.toString()] }
    }
    case 'price_from':
    case 'price_to':
    case 'sale_from':
    case 'sale_to': return { ...state, [key]: Number(value) }
    case 'favorite': return { ...state, [key]: Boolean(value) }
    default: return undefined
  }
})

productsState.on(setProductsState, (state, { key, value }) => {
  switch (key) {
    case 'limit':
    case 'page': return { ...state, page: Number(value) }
    case 'sort': {
      if (value === 'price_up' || value === 'sale_up' || value === 'update_up') return { ...state, sort: value }
      else return undefined
    }
    default: return undefined
  }
})

export const combineState = combine({ filtersState, productsState }, ({ filtersState, productsState }) => ({
  ...filtersState,
  ...productsState
}))
// endregion event_state_SET



//region view_state:
export const $filtersView = filtersState.map(state => ({
  categories: state.categories,
  brands: state.brands,
  colors: state.colors,
  sizes: state.sizes,
  prices: (state.price_to === null && state.price_from === null) ? null : { price_from: state.price_from, price_to: state.price_to },
  sales: (state.sale_to === null && state.price_from === null) ? null : { sale_from: state.sale_from, sale_to: state.sale_to },
  favorite: state.favorite
}))
// endregion view_state



// region encode_url_state:


// endregion encode_url_state



// region fetch:
const fetchFilters = createEffect({
  handler: (params: FilterReqParams) => (
    api.products.getFilters(params)
  )
})

const fetchProducts = createEffect({
  handler: (params: ProductsReqParams) => (
    api.products.getProducts(params)
  )
})

// todo !!!
guard({
  source: combineState.updates,
  filter: () => (!blockReplaceAndFetch.getState()),
  target: fetchProducts
})
// endregion fetch


filtersState.watch(state => console.log(state))
productsState.watch(state => console.log(state))
