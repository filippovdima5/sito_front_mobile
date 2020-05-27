import { SexId } from '../types'
import { sizes } from '../constants'
import {strict} from 'assert'


// region exports
export { getMetaTagsLink } from './get-meta-tags-link'
export { parseUrl } from './parse-url'
export { encodeProductsUrl } from './encode-url'
// endregion


export const sexIdToStr = function sexIdToStr (sexId: 1 | 2 | 0): 'men' | 'women' {
  if (sexId === 1) return 'men'
  return 'women'
}

export const sexStrToId = ( sexStr: 'men' | 'women' ): 1 | 2 => {
  if (sexStr === 'men') return 1
  return 2
}

export const findSexLine = ( url: string ): 1 | 2 | null => {
  if (!url.includes('men')) return null
  if (url.includes('women')) return 2
  return 1
}

export const findSexIdInPath = (pathname: string): SexId => {
  if (pathname.includes('/women')) return 2
  if (pathname.includes('/men')) return 1
  return 1
}

export const findSexIdInPathNotStrict = (pathname: string): SexId | undefined => {
  if (pathname.includes('/women')) return 2
  if (pathname.includes('/men')) return 1
  return undefined
}


export const sortByChar = (char: string): number => {
  if (!isNaN(Number(char.charAt(0)))) return 2e4 + Number(char.charAt(0))
  return char.toLowerCase().charCodeAt(0)
}

export const sortBrands = (arr: Array<string>): Array<string> => arr.sort((a, b) => sortByChar(a) - sortByChar(b))


const getIndex = (str: string): number => {
  const index = sizes.findIndex(size => size === str)
  if (index === -1) return sortByChar(str)
  return index
}
export const sortSizes = (arr: Array<string>): Array<string> => arr.sort((a, b) => getIndex(a) - getIndex(b))


// words[0] - модель
// words [1] - модели
// words [2] - моделей

export const numeralEnding = (words: [string, string, string], number: number): string => {
  if (number >= 5 && number <= 20 || (number % 10) === 0) return words[2]
  
  const strNumber = number.toString()
  if (Number(strNumber.substring(strNumber.length - 2)) % 11 === 0) return words[2]
  
  const lastTwoNumber = Number(strNumber.substring(strNumber.length -1 ))
  if (lastTwoNumber === 1) return words[0]
  if (lastTwoNumber === 2 || lastTwoNumber === 3 || lastTwoNumber === 4) return words[1]
  
  
  return words[2]
}
