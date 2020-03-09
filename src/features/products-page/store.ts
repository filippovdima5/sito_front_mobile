import {combine, createEffect, createEvent, createStore, guard, merge, restore } from 'lib/effector'

import { $sexId, $sexLine } from '../../stores/user'
import { $baseLink } from '../../stores/env'

import {api} from '../../api'
import config from '../../config'
import { parseQueryProducts, parseSearch } from '../../ssr/lib'

import {RouteComponentProps} from 'react-router'
import {MainState, StatusPage, TypeSet} from './types'
import {FilterReqParams, FiltersRequest, PaginateInfo, ProductsReqParams, ProductsRequest} from '../../api/types'
import {sample} from 'effector'



//region route_history:
export const $initRouteHistory = createEvent<RouteComponentProps['history']>()
const routeHistory = createStore<RouteComponentProps['history'] | null>(null)
routeHistory.on($initRouteHistory, (_, payload) => payload)
//endregion route_history



//region main_state:

export const setTypeSet = createEvent<TypeSet>()
const $typeSet = restore(setTypeSet, { type: 'set_hydrate' })


export const mainState = createStore<MainState>({
  categories: null,
  brands: null,
  sizes: null,
  colors: null,
  price_from: null,
  price_to: null,
  sale_from: null,
  sale_to: null,
  favorite: null,
  page: null,
  sort: null,
  limit: null,
})


export const $toggleSex = createEvent()
mainState.on($toggleSex, () => {
  return mainState.defaultState
})


export const filtersState = mainState.map(({ categories, brands, sizes, colors, price_to, price_from, sale_to, sale_from, favorite }) => ({
  categories, brands, sizes, colors, price_to, price_from, sale_to, sale_from, favorite
}))

export const productsState = mainState.map(({ limit, page, sort }) => ({ limit, sort, page }))

// endregion main_state



// region set event_state_SET:
export const setFilter = createEvent<{key: keyof Omit<MainState, 'sort' | 'limit' | 'page'>, value: string | number | boolean | null}>()

export const setProductsState = createEvent<{
  key: keyof Pick<MainState, 'sort' | 'limit' | 'page' >, value: 'update_up' | 'price_up' | 'sale_up' | number,
}>()


mainState.on(setFilter, (state, { key, value }) => {
  setTypeSet({ key, type: 'set_filter' } )
  if (value == null) return ({ ...state, [key] : null })
  switch (key) {
    case 'categories': {
      if (state[key] === null) return { ...state, [key]: [Number(value)] }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (state[key]!.includes(Number(value))) {
        let newState: null | Array<number> = state[key]!.filter(i => i !== value)
        if (newState.length === 0) newState = null
        return { ...state, [key]: newState }
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      else return { ...state, [key]: [...state[key]!, Number(value)] }
    }
    case 'brands':
    case 'sizes':
    case 'colors': {
      if (state[key] === null) return { ...state, [key] : [value.toString()] }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (state[key]!.includes(value.toString())) {
        let newState: null | Array<string> = state[key]!.filter(i => i !== value.toString())
        if (newState.length === 0) newState = null
        return { ...state, [key]: newState }
      }
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

mainState.on(setProductsState, (state, { key, value }) => {
  setTypeSet({ type: 'set_products', key })
  switch (key) {
    case 'limit':
    case 'page': return { ...state, page: Number(value) }
    case 'sort': {
      if (value === 'price_up' || value === 'sale_up' || value === 'update_up') {
        return { ...state, sort: value, page: 1 }
      }
      else return undefined
    }
    default: return undefined
  }
})

// endregion event_state_SET




//region fetchFilters:
const fetchFilters = createEffect({
  handler: ( params: FilterReqParams ) => api.products.getFilters(params)
})

const fetchFiltersParams = filtersState.map(state => {
  const sexId = $sexId.getState()
  if (sexId === null) return undefined
  const params: FilterReqParams = { sex_id: sexId }
  if (state.categories !== null) params.categories = state.categories
  if (state.brands !== null) params.brands = state.brands
  if (state.colors !== null) params.colors = state.colors
  if (state.sizes !== null) params.sizes = state.sizes
  if (state.favorite !== null) params.favorite = state.favorite
  if (state.price_from != null) params.price_from = state.price_from
  if (state.price_to !== null) params.price_to = state.price_to
  if (state.sale_from != null) params.sale_from = state.sale_from
  if (state.sale_to != null) params.sale_to = state.sale_to
  return params
})



guard({
  source: fetchFiltersParams.updates,
  filter: () => true,
  target: fetchFilters
})
//endregion fetchFilters



//region fetchProducts:
const fetchProducts = createEffect({
  handler: (params: ProductsReqParams) => api.products.getProducts(params)
})

$sexId.watch(state => console.log(state))

const fetchProductsParams = mainState.map(state => {
  const sexId = $sexId.getState()
  console.log(sexId)
  if (sexId === null) return undefined
  const params: ProductsReqParams = { sex_id: sexId }
  if (state.categories !== null) params.categories = state.categories
  if (state.brands !== null) params.brands = state.brands
  if (state.colors !== null) params.colors = state.colors
  if (state.sizes !== null) params.sizes = state.sizes
  if (state.favorite !== null) params.favorite = state.favorite
  if (state.price_from != null) params.price_from = state.price_from
  if (state.price_to !== null) params.price_to = state.price_to
  if (state.sale_from != null) params.sale_from = state.sale_from
  if (state.sale_to != null) params.sale_to = state.sale_to
  if (state.page !== null) params.page = state.page
  if (state.limit !== null) params.limit = state.limit
  if (state.sort !== null) params.sort = state.sort
  return params
})



guard({
  source: fetchProductsParams.updates,
  filter: () => true,
  target: fetchProducts
})

//endregion fetchProducts



// region encode_url_state:
mainState.updates.watch((payload) => {
  const sexLine = $sexLine.getState()
  if (sexLine === null || config.ssr) return undefined
  
  
  let newUrl = '/products/' + sexLine
  
  //todo типы!
  const encode = Object.entries(payload).filter(([_, value]) => (value !== null))
  //as Array<[keyof AfterDecodeUrl, any]>
  
  let search: string
  if (encode.length === 0) search = ''
  else {
    search = '?' + encode
      .filter(([ key, value ]) => {
        switch (key) {
          case 'sexId': return false
          case 'sort': return value !== 'update_up'
          case 'page': return value !== 1
          case 'favorite': return Boolean(value)
          default: return true
        }
      })
      .map(([ key, value ] ) => {
        if (Array.isArray(value)) return key + '=' + value.join('|')
        switch (typeof value) {
          case 'number': return key + '=' + value.toString()
          case 'string': return key + '=' + value
          case 'boolean': return key + '=' + (value ? '1' : '0')
          default: return key + '='
        }
      })
      .join('&')
  }

  const url = newUrl + search
  routeHistory.getState()?.replace(url)
})
// endregion encode_url_state



//region filtersStore:
export const $filtersStore = createStore<FiltersRequest | null>(null)
$filtersStore.on(fetchFilters.done, (state, { result: { data } }) => data)
//endregion filtersStore



//region productsStore:
export const $productsStore = createStore<ProductsRequest['products']>([])
$productsStore.on(fetchProducts.done, (state, { result: { data: { products } } }) => {
  const typeSet = $typeSet.getState()
  if ( typeSet.type === 'set_products' && typeSet.key === 'page' ) return [...state, ...products]
  return products
})

export const $productsInfoStore = createStore<PaginateInfo>({
  total: 0,
  total_pages: 0
})
$productsInfoStore.on(fetchProducts.done, ((state, { result: { data: { info } } }) => info))

//endregion productsStore



// region mountApp:
export const $mountProductsPage = createEvent()
export const $mountProductsPageLocal = createEvent<{search: string}>()
const storeForMount = $baseLink.map(state => {
  const { linkParams: { search } } = state
  const queryParams = parseSearch(search)
  return parseQueryProducts(queryParams)
})

const targetUpdate = sample(storeForMount, $mountProductsPage)
mainState.on(targetUpdate, (state, payload) => {
  if (payload === null) return undefined
  return {...state, ...payload}
})
mainState.on($mountProductsPageLocal, (state, { search }) => {
  const queryParams = parseSearch(search)
  console.log(search)
  console.log({...state, ...parseQueryProducts(queryParams)})
  return {...state, ...parseQueryProducts(queryParams)}
})

targetUpdate.watch(payload => console.log(payload))
// endregion mountApp



// region statusPage:
export const $loadingProducts = fetchProducts.pending.map(state => state)
$loadingProducts.on(fetchProducts, () => true)
$loadingProducts.on(merge([fetchProducts.done, fetchProducts.fail]), () => false)

export const $statusPageProducts = createStore<StatusPage>('START')
$statusPageProducts.on(fetchProducts.done, (state, { result: { data: { products } } }) => {
  if (products.length === 0) return 'EMPTY'
  return 'READY'
})


export const $lengthSkeletonData = createStore<number>(20)
const targetSkeletonLength = combine({ productsState, $productsStore })
$lengthSkeletonData.on(targetSkeletonLength.updates, (_, { productsState: { page }, $productsStore }) => {
  if (page === null) page = 1
  const length = page * 20 - $productsStore.length
  if (length > 0) return length
  return 0
})
// endregion statusPage

