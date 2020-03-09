import { createEffect, createEvent, createStore, merge, sample, guard } from 'lib/effector'
import { ShortProduct } from '../../api/types'
import { api } from '../../api'

import { $likes } from '../../stores/user'


export type StatusPage = 'START' | 'EMPTY' | 'READY'
export const $statusPage = createStore<StatusPage>('START')


export const $loadLikeProducts = createEvent()
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


guard({
  source: sample($likes, $loadLikeProducts, (source => ({ likes: source }))),
  filter: () => true,
  target: fetchLikeProducts
})


export const $loadingLikes = createStore<boolean>(false)
$loadingLikes.on(fetchLikeProducts, () => true)
$loadingLikes.on(merge([fetchLikeProducts.done, fetchLikeProducts.fail]), () => false)