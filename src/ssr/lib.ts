import { AfterDecodeUrl } from '../features/products-page/types'



export const parseSearch = (search: string): any | null => {
  if (!Boolean(search)) return null
  return Object.fromEntries(search
    .split('&')
    .map(item => item.split('=')))
}


export const parseQueryProducts = (queryParams?: any): AfterDecodeUrl => {
  const setObject: AfterDecodeUrl = {};
  if (!Boolean(queryParams)) return setObject;
  const queryArr = Object.entries(queryParams)
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
        if (Boolean(value) && Number(value) > 1) value = '1'
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