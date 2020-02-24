/* eslint-disable prefer-template */
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { StaticRouter } from 'react-router'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'


import { App } from '../app'


import { template } from './template'



// Достаем информацию о сгенерированных webpack'ом бандлах сервера и клиента
const clientStatsFile = path.resolve(__dirname, 'loadable-stats.json')

// Создаем экстракторы для клиента на основе информации от webpack'а
const clientExtractor = new ChunkExtractor({ statsFile: clientStatsFile })



export const render = async (ctx: any) => {
  

  try {
    const jsx = (
      <ChunkExtractorManager extractor={clientExtractor}>
        <StaticRouter location={ctx.path}>
          {console.log(ctx.path)}
          <App />
        </StaticRouter>
      </ChunkExtractorManager>
    )
    

    const html = ReactDOMServer.renderToString(jsx)


    // Получаем все необходимые для рендеринга на клиенте скрипты
    const scripts = clientExtractor.getScriptTags()


    // Получаем стили и статический ксс
    const styleTags = clientExtractor.getStyleTags()



    // Чистим строку от ссылок перед кэшированием (possible v8 memory leaks)
    return template({ html, scripts, styleTags }).split('').join('')
  } catch (e) {
    console.log(e)
  }
}
