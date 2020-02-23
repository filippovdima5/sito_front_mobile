import axios, { AxiosPromise } from 'axios'
import config from '../config'
import {
  ProductsReqParams,
  ProductsRequest,
  FilterReqParams,
  FiltersRequest,
  MainSearchReqParams,
  MainSearchResultItem,
  UserRequest,
  UserReqParams,
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
  user: {
    setUser: (params: UserReqParams) => apiPost
      .post('/user', params),
    
    getUser: (): AxiosPromise<UserRequest> => apiGet
      .get('/user')
  },

  
  products: {
    getProducts: (params: ProductsReqParams): AxiosPromise<ProductsRequest> => apiPost
      .post('/products/products-list', params),
    
    getFilters: (params: FilterReqParams): AxiosPromise<FiltersRequest> => apiPost
      .post('/products/facet-filters', params)
  },

  
  search: {
    mainSearch: (params: MainSearchReqParams): AxiosPromise<Array<MainSearchResultItem>> => apiPost
      .post('/search/main-search', params)
  }
}