import { createEvent, createStore } from 'effector'
import { UserInfo, SexId } from './types'


export const $userInfo = createStore<UserInfo>({
  sex_id: null,



})


export const $sexId  = $userInfo.map(({ sex_id }) => (sex_id))
export const setSexId = createEvent<SexId>()
$userInfo.on(setSexId, (state, payload) => ({ ...state, sex_id: payload }))

setSexId.watch(payload => {
  if (payload !== null) {
    localStorage.setItem('sex_id', payload.toString())
  }
})





