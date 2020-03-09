import { Home } from './home'
import { Products } from './products'
import { Brands } from './brands'
import { Likes } from './likes'
import { NotFound } from './not-found'


export const ROUTES = [
  {
    path: '/',
    exact: true,
    component: Home,
    
  },
  {
    path: '/home/:sex?',
    component: Home,
  },
  {
    path: '/products/:sex?',
    component: Products,
  },
  {
    path: '/brands/:sex?',
    component: Brands,
  },
  {
    path: '/likes',
    component: Likes,
  },
  {
    path: '*',
    component: NotFound,
  },
]