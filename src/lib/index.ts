import { SexId } from '../types'


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




