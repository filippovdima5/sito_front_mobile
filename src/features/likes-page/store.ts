import {createEffect, createEvent, createStore, merge, sample} from 'lib/effector'
import { $likes } from '../../stores/env'
import { ShortProduct } from '../../api/types'
import { api } from '../../api'


export type StatusPage = 'START' | 'EMPTY' | 'READY'

export const $statusPage = createStore<StatusPage>('START')




export const loadLikeProducts = createEvent()

const fetchLikeProducts = createEffect({
  handler: (params: { likes: Array<string> }) => api.products.getLikeProducts(params)
})

export const $likeProducts = createStore<Array<ShortProduct>>([])

$likeProducts.on(fetchLikeProducts.done, (_, { result: { data } } ) => data)
$likes.on(fetchLikeProducts.done, (state, { result: { data } }) =>  {
  return data.map(item => item.id)
})


$statusPage.on(fetchLikeProducts.done, (_, { result: { data } }) => {
  if (data.length === 0) return 'EMPTY'
  return 'READY'
})

sample($likes, loadLikeProducts).watch(likes => {
   fetchLikeProducts({ likes })
})


export const $loadingLikes = createStore<boolean>(false)
$loadingLikes.on(fetchLikeProducts, () => true)
$loadingLikes.on(merge([fetchLikeProducts.done, fetchLikeProducts.fail]), () => false)