import { createEffect, createEvent, createStore, merge } from 'effector'
import { api } from '../../api'
import { GenderInfo } from './types'


export const fetchUser = createEffect({
  handler: api.user.getUser
})


//region Gender:
export const $genderInfo = createStore<GenderInfo>(null)

export const setGender = createEvent<'men' | 'women' | 1 | 2 | null>()
const fetchSexId = fetchUser.done.map(({ result: { data } }) => {
  if (data.sex_id) return data.sex_id
  return null
})

const targetSetGender = merge([setGender, fetchSexId])

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
    case 'men': api.user.setUser({ sex_id: 1 }); break
    case 2:
    case 'women': api.user.setUser({ sex_id: 2 }); break
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
