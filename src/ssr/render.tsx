/* eslint-disable prefer-template */
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { matchRoutes } from 'react-router-config'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'

import { fork, serialize, allSettled } from 'effector/fork';
import { forward, clearNode, rootDomain, START } from 'lib/effector';

import { App } from '../app'
import { ROUTES } from '../pages/routes'

import { template } from './template'


import { $loadBrands } from '../features/brands-page/store'


const clientStatsFile = path.resolve(__dirname, './loadable-stats.json')
const clientExtractor = new ChunkExtractor({ statsFile: clientStatsFile })



export const render = async (ctx: any) => {
  

  const pageEvents = matchRoutes(ROUTES, ctx.url)
    .map((match) =>
      // @ts-ignore
      match.route.component ? match.route.component[START] : undefined,
    )
    .filter(Boolean)
  
  
  const startServer = rootDomain.createEvent()
  
  if (pageEvents.length > 0) {
    try {
      // console.log(startServer, 'startServer')
      // console.log(pageEvents.length, 'pageEvents.length')
      forward({ from: startServer, to: pageEvents })
    }catch (e) {
      console.log(e, 'dima')
    }
  }
  
  const scope = fork(rootDomain)
  
  try {
    await allSettled($loadBrands, {
      scope,
      params: undefined,
    });
  } catch (error) {
    console.log(error)
  }
  
  const context = {}
  
  
  try {
    const jsx = (
      <ChunkExtractorManager extractor={clientExtractor}>
          <StaticRouter context={context} location={ctx.url}>
            <App root={scope}/>
          </StaticRouter>
      </ChunkExtractorManager>
    )
  
    const html = ReactDOMServer.renderToString(jsx)
  
    const preloadedState = serialize(scope)
    
    // Получаем все необходимые для рендеринга на клиенте скрипты
    const scripts = clientExtractor.getScriptTags()
    
    // Получаем стили
    const styleTags = clientExtractor.getStyleTags()
    

    // Чистим строку от ссылок перед кэшированием (possible v8 memory leaks)
    return template({ html, preloadedState,  styleTags,  scripts }).split('').join('')
  } catch (e) {
    console.log(e)
  }
}
