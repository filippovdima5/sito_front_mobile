import {combine, createEffect, createEvent, createStore, merge} from 'lib/effector'
import { AllBrandsRequest } from '../../api/types'
import {api} from '../../api'



const brands = createStore<Array<AllBrandsRequest>>([])


export const loadBrands = createEffect({
  handler: (sexId: 1 | 2) => api.simple.allBrands({ sexId })
})

brands.on(loadBrands.done, (_, { result: { data } }) => data )



export const setFilterString = createEvent<string>()
export const filterString = createStore<string>('')
filterString.on(setFilterString, (_, string) => string)

export const $filterBrands = combine({filterString, brands})
  .map(({ brands, filterString }) => {
    
  if (filterString.length < 1) return brands
  
  const firstChar = filterString.charAt(0)
  const oneGroup = brands.filter(({ char }) => (char.toLowerCase() === firstChar.toLowerCase()))
  return oneGroup.map(item => ({
    ...item,
    brands: item.brands.filter(item => item._id.toLowerCase().includes(filterString.toLowerCase()))
  }))
})


export const $loadingBrands = createStore<boolean>(false)
$loadingBrands.on(loadBrands, () => true)
$loadingBrands.on(merge([loadBrands.done, loadBrands.fail]), () => false)