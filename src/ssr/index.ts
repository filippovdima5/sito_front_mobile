import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import logger from "koa-logger"
import proxy from 'koa-proxy'
import { render } from './render'


const app = new Koa()


const statMiddleware = serve(`${path.resolve(__dirname, 'static')}`, {
  index: false,
  maxage: 60000,
})

const setupKoa = () => {
  app.use(mount('/static', statMiddleware))
  
  app.use(mount('/api', proxy({
    host: 'http://localhost:8080',
    map: path => `/api${path}`
  })))
  
  app.use(logger())
  
  app.use(async (ctx) => {
    ctx.body = await render(ctx)
  })
  
  app.listen(9000, () => {
    console.log('app started: 9000')
  })
}

setupKoa()
