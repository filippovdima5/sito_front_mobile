import {combine, createEffect, createEvent, createStore, merge} from 'lib/effector'
import { AllBrandsRequest } from '../../api/types'
import {api} from '../../api'
import {guard, sample} from 'effector'


const brands = createStore<Array<AllBrandsRequest>>([])

// ---
const sex = createStore<number>(2)
export const $loadBrands = createEvent()

$loadBrands.watch(payload => console.log('DADAADDADADADDADDAD!!!!!!!!!!!'))

export const loadBrands = createEffect({
  handler: (sexId: 1 | 2) => api.simple.allBrands({ sexId })
})

loadBrands.watch((payload) => console.log('Loadbrands effewct', payload))
loadBrands.done.watch(payload => console.log('BRANDS: ', payload))
loadBrands.fail.watch(({ error }) => console.log('FAIL', error))

const isIdle = loadBrands.pending.map(pending => !pending)


guard({
  source: sample(sex, $loadBrands),
  filter: isIdle,
  target: loadBrands,
})
// -----

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