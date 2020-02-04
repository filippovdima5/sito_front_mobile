function toNumber(item) {
  return ( (+item) ? +item : item )
}


export const parseSearch =  (search) => {
  if (!search) return {}
  return Object.fromEntries(
    decodeURI(search)
      .split('?')[1]
      .split('&')
      .map(item => (item.split('=')))
      .map(([key, value]) => (
        [key, ['page', 'sort'].includes(key) ? toNumber(value) : value.split('|').map(value => (toNumber(value)))]
      ))
  )
}