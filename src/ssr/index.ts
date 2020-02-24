/* eslint-disable padding-line-between-statements, no-return-assign, no-console */
import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import proxy from 'koa-proxy'
import { render } from './render'


const app = new Koa()
const PORT = 9000


const statMiddleware = serve(`${path.resolve(__dirname, 'static')}`, {
  index: false,
  maxage: 60000,
})

const setupKoa = () => {
  app.use(mount('/static', statMiddleware))
  
  
  app.use(async (ctx) => {
    ctx.body = await render(ctx)
  })

  app.listen(PORT, () => {
    console.log('app started: 9000')
  })
}

setupKoa()
