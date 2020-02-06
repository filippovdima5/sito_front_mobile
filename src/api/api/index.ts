import axios, { AxiosPromise } from 'axios'
import config from '../../config'
import { Env } from './types'


export const apiGet = axios.create({
  method: 'get',
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: config.ssr ? 5000 : 15000,
})

export const api = {
  env: {
    main: (): AxiosPromise<Env> => apiGet.get('/env/main')
  }
}