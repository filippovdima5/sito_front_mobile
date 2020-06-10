import config from '../config'


export function polyfills() {
  if (config.ssr) return null
  
  Object.fromEntries = Object.fromEntries || function(arr: any[]) {
    return arr.reduce(function(acc: { [x: string]: any }, curr: any[]) {
      acc[curr[0]] = curr[1]
      return acc
    }, {})
  }
  
  return null
}
