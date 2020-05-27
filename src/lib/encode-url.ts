import { defaultFields } from '../features/products-page/constants'
import { QueryFields } from '../features/products-page/types'
import { encodeStringArray, encodeNumberArray } from '../api/v2/lib'
import { sexIdToStr } from './index'


const encodeNumber = (key: string, value?: number): string | '' => {
  if (!value) return ''
  if (defaultFields[key as keyof QueryFields] === value) return ''
  return `${key}=${value.toString()}&`
}

const encodeString = (key: string, value?: string): string | '' => {
  if (!value) return ''
  if (defaultFields[key as keyof QueryFields] === value) return ''
  return `${key}=${value}&`
}



export const encodeProductsUrl = (params: QueryFields): string | null => {
  if (!params['sex_id']) return null
  const pathname = `/${sexIdToStr(params['sex_id'])}/products`
  
  let search = ''
  Object.entries(params).forEach(([key, value]) => {
    switch (key) {
      case 'sex_id': return null
      case 'price_from':
      case 'price_to':
      case 'sale_from':
      case 'sale_to':
      case 'page':
      case 'limit': return (search = search + encodeNumber(key, value as number))
      case 'brands':
      case 'sizes': return (search = search + encodeStringArray(key, value as Array<string>))
      case 'categories': return (search = search + encodeNumberArray(key, value as Array<number>))
      default: return (search = search + encodeString(key, value as string))
    }
  })
  
  if (!search) return pathname
  search = search.slice(0, -1)
  return `${pathname}?${search}`
}
