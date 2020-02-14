import { createEffect, createEvent, createStore, merge } from 'effector'
import { api } from '../../api'
import { GenderInfo } from './types'



//region Gender:
export const $genderInfo = createStore<GenderInfo>(null)

export const setGender = createEvent<'men' | 'women' | 1 | 2>()
export const fetchSexId = createEffect({
  handler: api.env.getSexId
})
const fetchSexIdDone = fetchSexId.done.map(i => i.result.data.sexId)
const targetSetGender = merge([setGender, fetchSexIdDone])


$genderInfo.on(targetSetGender, (_, payload) => {
  switch (payload) {
    case 1:
    case 'men': return { sexId: 1, inlineSex: 'men' }
    case 2:
    case 'women': return { sexId: 2, inlineSex: 'women' }
    default: return null
  }
})

setGender.watch(payload => {
  switch (payload) {
    case 1:
    case 'men': api.env.setInfo('sex_id', 1); break
    case 2:
    case 'women': api.env.setInfo('sex_id', 2); break
    default: return undefined
  }
})


export const $sexId = $genderInfo.map(state => {
  if (state) return state.sexId
  else return null
})

export const $sexLine = $genderInfo.map(state => {
  if (state) return state.inlineSex
  else return null
})

//endregion Gender
