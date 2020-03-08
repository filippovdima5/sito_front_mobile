import { combine, createEffect, createEvent, createStore, guard, restore, sample } from 'lib/effector'
import { api } from '../../api'
import { MainSearchResultItem, MainSearchReqParams } from '../../api/types'
import { $sexId } from '../../stores/env2'


export const setModSearch = createEvent()
export const $modSearch  = createStore<boolean>(false)
$modSearch.on(setModSearch, (state) => !state)

export const setPhrase = createEvent<string>()
export const $phrase = restore(setPhrase, '')


export const $searchResult = createStore<Array<MainSearchResultItem>>([])
export const fetchSearch = createEffect({
  handler: async (params: MainSearchReqParams) => await api.search.mainSearch(params)
})

$searchResult.on(fetchSearch.done, (_, { result: { data } }) => data)



export const $showResults = createStore<boolean>(false)
const targetViewResult = combine({ $modSearch, $phrase, $searchResult }, ({ $modSearch, $phrase, $searchResult }) => (
  $modSearch && Boolean($phrase) && ($searchResult.length > 0)
))
$showResults.on(targetViewResult, (_, payload) => payload)


const paramsFetch = combine({ $sexId, $phrase }, ({ $sexId: sex_id, $phrase: phrase  }) => {
  if (sex_id === null) return { sex_id: 0, phrase }
  return { sex_id, phrase }
})

guard({
  source: sample(paramsFetch, $phrase.updates),
  filter: () => $modSearch.getState(),
  target: fetchSearch,
})

