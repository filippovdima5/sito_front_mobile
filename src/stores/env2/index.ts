import {createEffect, createEvent, createStore, merge, restore, sample} from 'lib/effector'
import { api } from '../../api'
import { GenderInfo, CurrentRoute } from './types'



export const fetchUser = createEffect({
  handler: api.user.getUser
})
const userDone = fetchUser.done.map(payload => payload.result.data)
const $userStore = restore(userDone, {})


//region Gender:
export const $genderInfo = createStore<GenderInfo>(null)

export const setGender = createEvent<'men' | 'women' | 1 | 2 | null>()
const fetchSexId = $userStore.map((user) => {
  if (user.sex_id) return user.sex_id
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



// region Likes:
export const fetchUserLikes = createEffect({
  handler: api.user.getUser
})
export const loadLikes = createEvent()
export const $likes = createStore<Array<string>>([])


$likes.on($userStore.updates, (_, payload) => {
  if (!payload.likes) return
  return payload.likes
})

sample($likes, loadLikes).watch(payload => {
  if (payload.length === 0) fetchUserLikes(null)
})


export const setLike = createEvent<string>()

const targetSetLike = sample($likes, setLike, (likes, idProduct) => {
  if (likes.includes(idProduct)) return likes.filter(id => id !== idProduct)
  return [...likes, idProduct]
})

$likes.on(targetSetLike, (_, payload) => payload)
$likes.on(fetchUserLikes.done, (state, { result: { data } }) => {
  if (data.likes) return data.likes
})
targetSetLike.watch(payload => {
  api.user.setUser({ likes: payload })
})

// endregion Likes



// region Route-page:
export const setCurrentRoute = createEvent<CurrentRoute>()
export const $currentRoute = restore(setCurrentRoute, '/home/')
// endregion Route-page