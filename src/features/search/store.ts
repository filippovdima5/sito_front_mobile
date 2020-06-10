import { createEffect, createEvent, createStore, forward } from 'lib/effector'
import { createDebounce } from 'effector-debounce'
import { SearchItem, SearchParams } from '../../api/v2/types'
import { apiV2 } from '../../api'
import { setSexId } from '../../stores/location-listen'
import { SexId } from '../../types'
import { sortByChar } from '../../lib'


const LIMIT = 48

// region
export const $setModSearch = createEvent<{ mod: boolean, sex_id?: SexId }>()
export const $modSearch  = createStore(false)
$modSearch.on($setModSearch, (_, p) => p.mod)


export const $setSearch = createEvent<{ sex_id?: SexId, phrase: string }>()

export const $searchResult = createStore<Array<SearchItem>>([])
export const $loadingSearchItems = createStore(false)
export const $stateFetchSearchItems =  createStore<'START' | 'LOADING' | 'EMPTY' | 'READY' | 'ERROR'>('START')
// endregion


// region
export const fetchSearch = createEffect({
  handler: async (params: SearchParams) => await apiV2.search.brands(params)
})

$searchResult.on(setSexId, () => [])


$searchResult.on(fetchSearch.done, (_, { result: { data } }) => data.sort((a, b) => sortByChar(a.title) - sortByChar(b.title)))
$loadingSearchItems.on(fetchSearch.pending, (_, p) => p)
$stateFetchSearchItems.on(fetchSearch.pending, (_, p) => {
  if (p) return 'LOADING'
})
$stateFetchSearchItems.on(fetchSearch.done, (_, { result: { data } }) => {
  if (data.length === 0) return 'EMPTY'
  return 'READY'
})
$stateFetchSearchItems.on(fetchSearch.fail, () => 'ERROR')
// endregion


const $debounceFetch = createEvent<SearchParams>()
forward({
  from: createDebounce($debounceFetch, 1000),
  to: fetchSearch
})

// region
forward({
  from: $setSearch.map(payload => ({ limit: LIMIT, ...payload })),
  to: $debounceFetch
})
// endregion

// $paramsForSearch.watch(state => console.log(state, 'paramsForSearchBrandsa'))
