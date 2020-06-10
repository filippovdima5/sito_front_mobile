import { QueryFields } from '../features/products-page/types'
import { sortTypes } from '../features/products-page/constants'
import { findSexIdInPath } from './index'


function parsePage(key: string, value: string, query: any): void {
  if (Number(value) !== 1) {
    query[key as keyof QueryFields] = 1
    return
  }
  if (!isNaN(Number(value))) query[key as keyof QueryFields] = Number(value)
}

function parseNumber(key: string, value: string, query: any): void {
  if (!isNaN(Number(value))) query[key as keyof QueryFields] = Number(value)
}

function parseArrayNumber(key: string, value: string, query: any): void {
  if (value) {
    const res = value.split(',').filter(i => !isNaN(Number(i))).map(i => Number(i))
    if (res.length > 0) query[key as keyof QueryFields] = res
  }
}

function parseArrayString(key: string, value: string, query: any): void {
  if (value) {
    const res = value.split(' | ')
    if (res.length > 0) query[key as keyof QueryFields] = res
  }
}

function parseBoolean(key: string, value: string, query: any): void {
  switch (value) {
    case 'true': query[key as keyof QueryFields] = true; break
    case 'false': query[key as keyof QueryFields] = false
  }
}


export const parseUrl = (pathname: string, search: string ): QueryFields => {
  const query: QueryFields = { sex_id: findSexIdInPath(pathname) }
  
  if (!search) return query
  let foundFields: any = {}
  
  try {
    foundFields = Object.fromEntries(
      decodeURI(search).replace('?', '')
        .split('&')
        .map(i => i.split('='))
    )
  } catch (e) {
    console.error(e)
    // @ts-ignore
    return { ...query, err: `fromEntries:${JSON.stringify(e)}` }
  }
  
  Object.entries(foundFields).forEach(([key, value]) => {
    switch (key) {
      case 'sex_id':
      case 'price_from':
      case 'price_to':
      case 'sale_from':
      case 'sale_to':
      case 'limit': return parseNumber(key, value as string, query)
      case 'page': return parsePage(key, value as string, query)
      case 'brands':
      case 'sizes': return parseArrayString(key, value as string, query)
      case 'categories': return parseArrayNumber(key, value as string, query)
      case 'sort': {
        if (value && sortTypes[value as keyof typeof sortTypes]) {
          query['sort'] = value as keyof typeof sortTypes
        }
        break
      }
      case 'not_size': return parseBoolean(key, value as string, query)
    }
  })
  
  return query
}
