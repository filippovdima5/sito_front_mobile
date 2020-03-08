import { createStore, createEffect,  guard,  createEvent, merge } from 'lib/effector'
import { UserRequest} from '../api/types'
import { api } from '../api'



type GenderInfo = { sexId: 1, sexLine: 'men' } | { sexId: 2, sexLine: 'women' }


// region fetching:
export const $fetchUser = createEvent()
const fetchUserEffect = createEffect({
  handler: api.user.getUser
})
const $fetchedUser = createStore<UserRequest | null>(null)

guard({
  source: $fetchUser,
  filter: () => true,
  target: fetchUserEffect,
})

$fetchedUser.on(fetchUserEffect.done, (_, { result: { data } }) => data)

const $user = $fetchedUser.map(state => {
  if (state === null) return undefined
  return {
    sexId: state.sex_id,
    likes: state.likes
  }
})
// endregion fetching



// region Gender:
export const $setGender = createEvent<'men' | 'women' | 1 | 2>()

$setGender.watch(payload => console.log(payload))

const targetSexUpdate = merge([$user.updates.map(payload => {
  if (payload?.sexId) return payload.sexId
  return undefined
}), $setGender])

export const $genderInfo = createStore<GenderInfo | null>(null)
export const $sexId = $genderInfo.map(state => {
  if (state === null) return null
  return state.sexId
})
export const $sexLine = $genderInfo.map(state => {
  if (state === null) return null
  return  state.sexLine
})

$genderInfo.on(targetSexUpdate, (state, payload) => {
  if (!payload || payload === state?.sexId) return undefined
  switch (payload) {
    case 1:
    case 'men': return { sexId: 1, sexLine: 'men' }
    case 2:
    case 'women': return { sexId: 2, sexLine: 'women' }
    default: return undefined
  }
})
// endregion Gender



// region setFetchUser:
$setGender.watch(payload => {
  switch (payload) {
    case 1:
    case 'men': api.user.setUser({ sex_id: 1 }); break
    case 2:
    case 'women': api.user.setUser({ sex_id: 2 }); break
    default: return undefined
  }
})
// endregion setFetchUser

