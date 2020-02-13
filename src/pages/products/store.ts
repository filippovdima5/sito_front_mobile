import {  createEffect, createEvent, createStore, guard, restore } from 'effector'
import { RouteComponentProps } from 'react-router'
import { setGender } from '../../stores/env'
import { ProductsReqParams, FilterReqParams, ProductsRequest, PaginateInfo  } from '../../api/types'
import { api } from '../../api'
import { MainState, AfterDecodeUrl, TypeSet } from './types'



//region route_history:
export const initRouteHistory = createEvent<RouteComponentProps['history']>()
const routeHistory = createStore<RouteComponentProps['history'] | null>(null)
routeHistory.on(initRouteHistory, (_, payload) => payload)
//endregion route_history



//region main_state:
const setTypeSet = createEvent<TypeSet>()
const $typeSet = restore(setTypeSet, { type: 'set_url' })



const mainState = createStore<MainState>({
  sexId: null,
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

const sexId = mainState.map(({ sexId }) => sexId)
sexId.updates.watch((state) => {
  if (state === null) return
  setGender(state)
})

export const filtersState = mainState.map(({ sexId, categories, brands, sizes, colors, price_to, price_from, sale_to, sale_from, favorite }) => ({
  sexId, categories, brands, sizes, colors, price_to, price_from, sale_to, sale_from, favorite
}))

export const productsState = mainState.map(({ limit, page, sort }) => ({ limit, sort, page }))

/**Результаты первичного парсинга URL*/
const setFromDecodeUrl = createEvent<AfterDecodeUrl>()
mainState.on(setFromDecodeUrl, (state, payload) => ({ ...state, ...payload }))

// endregion main_state



//region set decode_url_state_SET:
routeHistory.updates.watch(state => {
  if (state === null) return undefined
  setTypeSet({ type: 'set_url' })

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
  }
})
// endregion decode_url_state



// region set event_state_SET:
export const setFilter = createEvent<{key: keyof Omit<MainState, 'sort' | 'limit' | 'page' | 'sexId'>, value: string | number | boolean}>()

export const setProductsState = createEvent<{
  key: keyof Pick<MainState, 'sort' | 'limit' | 'page' >, value: 'update_up' | 'price_up' | 'sale_up' | number,
}>()


mainState.on(setFilter, (state, { key, value }) => {
  setTypeSet({ key, type: 'set_filter' } )
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



//region fetchFilters:
const fetchFilters = createEffect({
  handler: ( params: FilterReqParams ) => api.products.getFilters(params)
})

const fetchFiltersParams = filtersState.map(state => {
  if (state.sexId === null) return undefined
  const params: FilterReqParams = { sex_id: state.sexId }
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
  filter: $typeSet.map(({ type }) => type !== 'set_products'),
  target: fetchFilters
})
//endregion fetchFilters



//region fetchProducts:
const fetchProducts = createEffect({
  handler: (params: ProductsReqParams) => api.products.getProducts(params)
})

// todo ! Нужно убрать! Это как то задеюствует фильтры и они апдейтятся
const fetchProductsParams = mainState.map(state => {
  if (state.sexId === null) return undefined
  const params: ProductsReqParams = { sex_id: state.sexId }
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

  const typeSet = $typeSet.getState()
  switch( typeSet.type ){
    case 'set_url': {
      params.page = 1
      params.limit = state.page ? state.page * 20 : 20
      return params
    }
    default: return params
  }
})

guard({
  source: fetchProductsParams.updates,
  filter: fetchProducts.pending.map(pending => !pending),
  target: fetchProducts
})
//endregion fetchProducts



// region encode_url_state:
mainState.updates.watch((payload) => {

  if ($typeSet.getState().type === 'set_url') return undefined
  if (payload.sexId === null) return undefined
  let newUrl = '/products/'
  const lineSex = payload.sexId === 1 ? 'men' : 'women'
  newUrl = newUrl + lineSex

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
          default: return true
        }
      })
      .map(([ key, value ] ) => {
        if (Array.isArray(value)) return key + '=' + value.join('|')
        switch (typeof value) {
          case 'number': return key + '=' + value.toString()
          case 'string': return key + '=' + value
          case 'boolean': return key + '=' + (value ? '1' : '0')
        }
      })
      .join('&')
  }

  routeHistory.getState()?.replace(newUrl + search)
})
// endregion encode_url_state



//region filtersStore:
export const filtersStore = createStore<ProductsRequest['products']>([])
filtersStore.on(fetchProducts.done, (state, { result: { data: { products } } }) => [...state, ...products])
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

