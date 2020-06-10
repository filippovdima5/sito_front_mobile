import { GenderDetected } from '../features/gender-detected'
import { PrivateOffice } from './private-office'
import { Home } from './home'
import { NotFound } from './not-found'
import { Products } from './products'
import { Brands } from './brands'


export const ROUTES = [
  { path: '/', exact: true, component: GenderDetected },
  
  { path: '/men/home', exact: true, component: Home },
  { path: '/women/home', exact: true, component: Home },
  
  { path: '/men/products', exact: true, component: Products },
  { path: '/women/products', exact: true, component: Products },
  
  { path: '/men/brands', exact: true, component: Brands },
  { path: '/women/brands', exact: true, component: Brands },
  
  
  { path: '/private-office', exact: true, component: PrivateOffice },
  { path: '/men/private-office', exact: true, component: PrivateOffice },
  { path: '/women/private-office', exact: true, component: PrivateOffice },
  

  
  { path: '*', exact: true, component: NotFound },
]


//   // { path: '/about', exact: true, component: AboutAs },
//   // { path: '/men/about', exact: true, component: AboutAs },
//   // { path: '/women/about', exact: true, component: AboutAs },
//   //
//   //

