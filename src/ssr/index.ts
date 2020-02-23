/* eslint-disable padding-line-between-statements, no-return-assign, no-console */
import path from 'path'
import Koa, { Context } from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import { render } from './render'



const app = new Koa()
const PORT = 9000


// eslint-disable-next-line no-undef
const statMiddleware = serve(`${path.resolve(__dirname, 'static')}`, {
  index: false,
  maxage: 60000,
})

const setupExpress = () => {
  app.use(mount('/static', statMiddleware))

  app.use(async (ctx) => {
    ctx.body = await render(ctx as Context )
  })

  app.listen(PORT, () => {
    console.log('app started')
  })
}

setupExpress()
