import { createEvent, createStore } from 'effector'
import { RouteComponentProps } from 'react-router'
import { FiltersState, AfterParseUrl } from './types'


//region HELPERS:

//endregion HELPERS



//region routeHistory:
export const initRouteHistory = createEvent<RouteComponentProps['history']>()
const routeHistory = createStore<RouteComponentProps['history'] | null>(null)
routeHistory.on(initRouteHistory, (_, payload) => payload)
//endregion routeHistory



//region stateFilters:
const allowPushLocate = createStore<boolean>(false)

const $sexId = createStore<1 | 2>(1)
const setSexId = createEvent<1 | 2| 'men' | 'women'>()
$sexId.on(setSexId, (_, payload) => {
  switch (payload) {
    case 1:
    case 'men': return 1
    case 2:
    case 'women': return 2
  }
})

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

const setParseUrlToStateFilters = createEvent<AfterParseUrl>()
filtersState.on(setParseUrlToStateFilters, (state, payload) => ({ ...state, ...payload }))

const $filtersView = filtersState.map(state => ({
  categories: state.categories,
  brands: state.brands,
  colors: state.colors,
  sizes: state.sizes,
  prices: { price_from: state.price_from, price_to: state.price_to },
  sales: { sale_from: state.sale_from, sale_to: state.sale_to },
  favorite: state.favorite
}))


export const $usedFilters = filtersState.map(state => {
  const usage: Array<keyof typeof $filtersView> = []
  const unused: Array<keyof typeof $filtersView> = []

  if (state.categories !== null) usage.push()
})
//stateFilters:

// usage: Object.entries(state)
//   .filter(([_, value]) => value !== null)
//   .map(([key]) => key as keyof FiltersState),
// unused: Object.entries(state)
//   .filter(([_, value]) => value === null)
//   .map(([key]) => key as keyof FiltersState)

//region fromUrl:

routeHistory.watch(state => {
  if (state === null) return undefined
  const { pathname, search } = state.location

  const sex = pathname.split('/products/')[1] as 'men' || 'women'
  // todo: Почему то не работает сет на другой файл $sexId:
  setSexId(sex)
  const setObject: AfterParseUrl = { sexId: sex === 'men' ? 1 : 2 }
  
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
    setParseUrlToStateFilters(setObject)
  }
})

filtersState.watch(state => console.log(state))


//routeHistory.watch(state => console.log(state))
// endregion fromUrl