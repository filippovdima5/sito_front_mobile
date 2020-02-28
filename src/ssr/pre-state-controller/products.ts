import { AfterDecodeUrl } from '../../pages/products/types'
import { api } from '../../api'
import {$filtersStore, $productsInfoStore, $productsStore, mainState} from '../../pages/products/store'

function parseQueryProducts(sexId: 1 | 2, queryParams: any) {
  const queryArr = Object.entries(queryParams)
  
  const setObject: AfterDecodeUrl = { sexId };
  
  if (queryArr.length === 0) return setObject;
  
  (queryArr as Array<[keyof AfterDecodeUrl, string]>).forEach(([key, value]) => {
    switch (key) {
      case 'categories':
        setObject[key] = value.split('|').map(item => +item)
        break
      case 'brands':
      case 'sizes':
      case 'colors':
        setObject[key] = value.split('|')
        break
      case 'price_from':
      case 'price_to':
      case 'sale_from':
      case 'sale_to':
      case 'page':
        setObject[key] = Number(value)
        break
      case 'sort': {
        if (['update_up', 'price_up', 'sale_up'].includes(value)) setObject[key] = value as 'update_up' | 'price_up' | 'sale_up'
        break
      }
      case 'favorite':
        setObject[key] = true
    }
  })
  
  return setObject
}

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