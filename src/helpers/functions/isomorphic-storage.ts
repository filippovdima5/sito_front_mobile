import ssr from '../../config'


export const isomorphicStorage = {
  get: (key: string) => {
    if (!ssr) return localStorage.getItem(key)
  },
}