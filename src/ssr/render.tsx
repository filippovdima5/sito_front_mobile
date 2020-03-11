import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { matchRoutes } from 'react-router-config'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { fork, serialize, allSettled } from 'effector/fork';
import { clearNode, rootDomain, START } from 'lib/effector';
import { App } from '../app'
import { ROUTES } from '../pages/routes'
import { template } from './template'
import { $setUrlInfo } from '../stores/env'
import { $setGender } from '../stores/user'
import {api} from '../api'
import { findSexLine } from '../helpers/lib'
import {Helmet} from "react-helmet"


const clientStatsFile = path.resolve(__dirname, './loadable-stats.json')
const clientExtractor = new ChunkExtractor({ statsFile: clientStatsFile, entrypoints: ['main'] })


export const render = async (ctx: any) => {
  // region Переменные необходимые для отрисовки (КЭШ):
  let sexIdUser: 1 | 2 | undefined = undefined
  const url = ctx.url
  const [ path, search ] = url.split('?')
  
  const cookie = ctx.cookies.get('user')
  if (Boolean(cookie)){
    const { data: { sex_id } } = await api.user.getIdUser({ id: cookie })
    sexIdUser = sex_id
  }
  const sexInUrl = findSexLine(url)
  if (sexInUrl !== null) sexIdUser = sexInUrl
  // endregion
  

  // region render:
  const scope = fork(rootDomain)
  
  // Сетим информацию о пользователе и локейшене страницы
  await Promise.all([
    allSettled($setUrlInfo, {scope, params: { path, search }}),
    allSettled($setGender, {scope, params: sexIdUser })
  ])
  
  
  // Ищем ивенты для первоночального стейта заматченных страниц и сетим их
  const pageEvents = matchRoutes(ROUTES, ctx.url)
    .map((match) =>
      // @ts-ignore
      match.route.component ? match.route.component[START] : undefined,
    )
    .filter(Boolean)
  
  
  if (pageEvents.length > 0){
    try {
      await Promise.all(pageEvents.map(event => allSettled(event, { scope, params: undefined })))
    } catch (error) {
      console.log(error)
    }
  }
  
  //endregion render
  
  const routerContext: Record<string, any> = {}
  try {
    const jsx = (
      <ChunkExtractorManager extractor={clientExtractor}>
          <StaticRouter context={routerContext} location={ctx.path}>
            <App root={scope} />
          </StaticRouter>
      </ChunkExtractorManager>
    )
    
    const html = ReactDOMServer.renderToString(jsx)
    const preloadedState = serialize(scope)
    const scripts = clientExtractor.getScriptTags()
    const styleTags = clientExtractor.getStyleTags()
    const helmet = Helmet.renderStatic()
    
    
    return template({ html, preloadedState,  styleTags,  scripts, helmet }).split('').join('')
  } catch (e) {
    console.log(e)
  }
}
