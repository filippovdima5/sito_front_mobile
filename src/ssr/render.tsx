/* eslint-disable prefer-template */
import path from 'path'

import React from 'react'
import { Context } from 'koa'
import ReactDOMServer from 'react-dom/server'

import { StaticRouter } from 'react-router'
import {  App } from '../app'


import { template } from './template'


export const render = async (ctx: Context) => {

  try {
    const jsx = (
      <StaticRouter location={ctx.path}>
        <App />
      </StaticRouter>
    )
    
    const html = ReactDOMServer.renderToString(jsx)
    
    // Чистим строку от ссылок перед кэшированием (possible v8 memory leaks)
    return template({ html  }).split('').join('')
    
    
  } catch (e) {
    console.log(e)
  }
}
