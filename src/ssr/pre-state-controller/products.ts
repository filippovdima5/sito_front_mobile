import { parseQueryProducts } from '../lib'
import { api } from '../../api'




export async function products(sexId: 1 | 2, queryParams: any) {
  
  const queryRes = parseQueryProducts(sexId, queryParams)
  
  return await Promise.all([
    api.products.getFilters({...queryRes, sex_id: sexId}),
    api.products.getProducts({...queryRes, sex_id: sexId}),
  ])
    .then(res => ({
      mainState: queryRes,
      filtersStore: res[0].data,
      productsStore: res[1].data.products,
      productsInfoStore: res[1].data.info
    }))
}