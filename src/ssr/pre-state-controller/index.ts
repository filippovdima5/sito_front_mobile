import { products } from './products'

const initState = {
  seo: {},
}

const routs = {
  '/products/men': {
    setState: products
  },
  '/products/women': {
    setState: products
  }
}


export async function preStateController(path: string, url: string, queryParams: any) {
  const routePath = path as keyof typeof routs
  switch (routePath) {
    case '/products/men': return {...initState, products: await products(1, queryParams)}
    case '/products/women': return {...initState, products: await products(2, queryParams)}
    
    
    default: return {...initState}
  }
}