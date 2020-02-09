import { createEffect, createEvent, createStore, merge } from 'effector'
import { api } from '../../api/api'
import { 
  GenderInfo
} from './types'



//region Gender:
export const $genderInfo = createStore<GenderInfo>(null)

export const setGender = createEvent<1 | 2>()
export const fetchSexId = createEffect({
  handler: api.env.getSexId
})
const fetchSexIdDone = fetchSexId.done.map(i => i.result.data.sexId)
const targetSetGender = merge([setGender, fetchSexIdDone])


$genderInfo.on(targetSetGender, (_, payload) => {
  switch (payload) {
    case 1: return { sexId: payload, inlineSex: 'men' }
    case 2:  return { sexId: 2, inlineSex: 'women' }
    default: return null
  }
})

setGender.watch(payload => { api.env.setInfo('sex_id', payload) })

export const $sexId = $genderInfo.map(state => {
  if (state) return state.sexId
  else return 1
})
//endregion Gender

