import { createEvent, createStore } from 'effector'
import { Env, Brands, Partners } from '../../api/api/types'


type EnvStore = {
  sex_id: Env['sex_id'],
  shoes: Env['shoes'],
  clothes: Env['clothes'],
  accessories: Env['accessories'],
  brands: Array<Brands> | null,
  partners: Array<Partners> | null,
}

type SetEnvField = { field: 'sex_id', value: Env['sex_id']} |
{ field: 'shoes', value: Env['shoes'] } |
{ field: 'accessories', value: Env['accessories'] } |
{ field: 'clothes', value: Env['clothes'] } |
{ field: 'brands', value: string }
  


const $env = createStore<EnvStore>({
  sex_id: null,
  shoes: null,
  clothes: null,
  accessories: null,
  brands: null,
  partners: null,
})




export const setEnvField = createEvent<SetEnvField>()
$env.on(setEnvField, (state, payload) => {
  switch (payload.field) {
    case 'sex_id': return { ...state, sex_id: payload.value }
    case 'accessories':
    case 'clothes':
    case 'brands':
    case 'shoes':
      if (state[payload.field] !== null) return state[payload.field]?.concat([payload.value]])

  }

})