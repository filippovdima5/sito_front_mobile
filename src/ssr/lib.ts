import { AfterDecodeUrl } from '../features/products-page/types'



export const parseQuery = (search: string): any => {
  const searchArr = search.split('?')
  let onlySearch =  searchArr[1]
  if (!onlySearch) onlySearch = searchArr[0]
  
  return Object.fromEntries(onlySearch
    .split('&')
    .map(item => item.split('=')))
}


export const parseQueryProducts = (sexId: 1| 2, queryParams: any): AfterDecodeUrl => {
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