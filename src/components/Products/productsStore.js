import { createStore } from 'effector'
import { fetchProducts, productsState } from '../../pages/Products/store'


export const productsCountsStore = createStore({
  countOnList: 20,
  total: 0,
  totalPages: 1,

  page: 1
})

export const productsSort = createStore('update_up')

productsSort.on(productsState, (state, { sort }) => sort)

productsCountsStore.on(productsState, ((state, { page }) => ({ ...state, page: page })))
productsCountsStore.on(fetchProducts.done, ((state, { result: { info: [{ total, totalPages }] } }) => ({ ...state, total, totalPages })))


