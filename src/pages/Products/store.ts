import { combine, createEffect, createEvent, createStore, guard } from 'effector'
import { sexDetected } from '../../helpers/functions/sexDetected'
import { objCompareJson } from '../../helpers/functions/objСompareJson'
import { shiftHistoryEffector } from '../../helpers/components/shift-history-in-store'
import { userInfo } from '../../stores/user/user'
import { api } from '../../api'
import { openFromMenu } from '../../components/Menu/NextMenu/Body/Body'
import { MainState } from './types';


// First mount Products -> parse URL -> set to all Products states -> fetches
export const sharedStateForProducts = createStore({})
export const hookFirstUrl = createEvent()
sharedStateForProducts.on(hookFirstUrl, (state, payload) => (payload))
// ------------------------------------------------------------------


// States of Products -> working in components of Products -> back up in this store
// Вызывают всю цепочку зависимостей:
const mainState = createStore<MainState>({
  sex_id: 1,

  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  prices: [],
  sales: [],

  sort: null,
  page: null
})

mainState.on(openFromMenu, ((state, { sex_id, index }) => ({ ...mainState.defaultState, sex_id: sex_id, categories: [index] })))

mainState.on(sharedStateForProducts, ((state, payload) => {
  if (objCompareJson(state, { ...state, ...payload })) return undefined
  else return { ...state, ...payload }
}))

export const sex_id = mainState.map(({ sex_id }) => ({ sex_id: sex_id }))

export const filtersState = mainState
  .map(({
    categories,
    brands,
    sizes,
    colors,
    prices,
    sales,
  }) => ({ categories, brands, sizes, colors, prices, sales }))

export const productsState = mainState.map(({ sort, page }) => ({ sort, page }))
export const setPage = createEvent()
export const setSort = createEvent<MainState['sort']>()
productsState.on(setPage, (state => ({ ...state, page: state.page ? +state.page + 1 : 2 })))
productsState.on(setSort, (state, payload) => ({ ...state, sort: payload, page: null }))
// ------------------


// Clearing states of Products:
const clearFiltersState = filtersState.map((state) => (
  Object.fromEntries(
    Object.entries(state).filter(([_, value]) => (value && value.length > 0))
  )
))
const clearProductsState = productsState.map(state => (
  Object.fromEntries(
    Object.entries(state).filter(([_, value]) => (!!value))
  )
))
//----------------------------


// Params for fetching:
const filtersFetchParams = combine(sex_id, clearFiltersState, (a, b) => ({ ...a, ...b }))
const productsFetchParams = combine(filtersFetchParams, clearProductsState, (a, b) => ({ ...a, ...b }))
//--------------------


// PUSH or REPLACE:
productsFetchParams.watch(({ sex_id, ...params }) => {
  // TODO: Типизация!
  // @ts-ignore
  shiftHistoryEffector.getState() && shiftHistoryEffector.getState().replace( `/products/${sexDetected(sex_id)}`, { ...params })
})
// ----------------------------


// Store of Product:
export const productsStore = createStore([])
export const filtersStore = createStore({
  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  prices: [],
  sales: [],
})
//-----------------


// Fetching:
export const fetchFilters = createEffect({
  // todo: Типизация
  handler: async (params: any) => await api.products.filters(params)
})
const loadingFilters = fetchFilters.pending.map(pending => !pending)
filtersStore.on(fetchFilters.done, ((state, { result }) => result))
guard({
  source: filtersFetchParams,
  filter: loadingFilters,
  target: fetchFilters
})


export const fetchProducts = createEffect({
  // todo: Типизация
  handler: async (params: any) => await api.products.getProducts(params)
})
export const loadingProducts = fetchProducts.pending.map(pending => !pending)
productsStore.on(fetchProducts.done, (state, { params : { page }, result: { products } }) => {
  if (page === 1 || !page) return products
  else return [...state, ...products]
})
guard({
  source: productsFetchParams,
  filter: loadingProducts,
  target: fetchProducts
})
//----------





//logs:
//const log = 'Products';
//mainState.watch(state => {console.log(state, `${log}-mainState`)});
//productsState.watch(state => {console.log(state, `${log}-productState`)});
//productsStore.watch(state => {console.log(state, `${log}-productsStore`)});
//-----
