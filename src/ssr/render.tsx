/* eslint-disable prefer-template */
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
//import { App } from '../app'
import { template } from './template'


import { store } from './setup-store'
import { preStateController } from './pre-state-controller'


interface EntryPoint {
  default: React.ComponentType<any>,
  hydrateInitialState?: (state: any) => void,
}


// Достаем информацию о сгенерированных webpack'ом бандлах сервера и клиента
const clientStatsFile = path.resolve(__dirname, './loadable-stats.json')
const serverStatsFile = path.resolve(__dirname, './loadable-stats-server.json')


// Создаем экстракторы для клиента на основе информации от webpack'а
const clientExtractor = new ChunkExtractor({ statsFile: clientStatsFile })
const serverExtractor = new ChunkExtractor({ statsFile: serverStatsFile, entrypoints: ['server'] })


/*
  Достаем точку входа для серверного бандла
  Отсюда же достаем экшн для запонения эффектора на стороне сервера
  Мы не может просто импортировать его сверху,
  Потому что иначе эффектор не будет реагировать на него, так как будет создано два экземпляра
*/
const { default: App, hydrateInitialState }: EntryPoint = serverExtractor.requireEntrypoint()



export const render = async (ctx: any) => {
  await preStateController(ctx.path, ctx.url, ctx.query, store)
  
  if (hydrateInitialState) {
    hydrateInitialState(store.getState())
  }
  

  try {
    const jsx = (
      <ChunkExtractorManager extractor={clientExtractor}>
        <Provider store={store}>
          <StaticRouter location={ctx.path}>
            <App />
          </StaticRouter>
        </Provider>
      </ChunkExtractorManager>
    )
    
    const html = ReactDOMServer.renderToString(jsx)
    
    // Получаем все необходимые для рендеринга на клиенте скрипты
    const scripts = clientExtractor.getScriptTags()
    
    // Получаем стили
    const styleTags = clientExtractor.getStyleTags()
    

    // Чистим строку от ссылок перед кэшированием (possible v8 memory leaks)
    return template({ html, preloadedState: store.getState(),  styleTags,  scripts }).split('').join('')
  } catch (e) {
    console.log(e)
  }
}
