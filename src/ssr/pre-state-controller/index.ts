import { products } from './products'

const routs = {
  '/products/men': {
    setState: products
  },
  '/products/women': {
    setState: products
  }
}


export async function preStateController(path: string, url: string, queryParams: any, store: any) {
  const routePath = path as keyof typeof routs
  switch (routePath) {
    case '/products/men': return await products(1, queryParams, store)
    case '/products/women': return await products(2, queryParams, store)
    default: return
  }
}