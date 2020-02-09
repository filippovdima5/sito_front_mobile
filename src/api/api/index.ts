import axios, { AxiosPromise } from 'axios'
import config from '../../config'
import {
  Env,
  SexId,
  ProductsReqParams,
  ProductsRequest,
  FilterReqParams,
  FiltersRequest
} from './types'


export const apiGet = axios.create({
  method: 'get',
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: config.ssr ? 5000 : 15000,
})

export const apiPost = axios.create({
  method: 'post',
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: config.ssr ? 5000 : 15000,
})


export const api = {
  env: {
    getSexId: (): AxiosPromise<SexId> => apiGet.get('/env/gender'),
    setInfo: (key: string | number, value: string | number) => apiPost(`/user?${key.toString()}=${value.toString()}`),

    main: (): AxiosPromise<Env> => apiGet.get('/env2/main'),
  },

  products: {
    getProducts: (params: ProductsReqParams): AxiosPromise<ProductsRequest> => apiPost
      .post('/products/products-list', params),
    getFilters: (params: FilterReqParams): AxiosPromise<FiltersRequest> => apiPost
      .post('/products/facet-filters', params)
  }
}