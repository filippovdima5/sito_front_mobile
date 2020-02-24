/* eslint-disable prefer-template */
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
//import { App } from '../app'
import { template } from './template'


//import { store } from './setup-store'
// import { api } from '../api'
// import { constants } from '../store-redux/constants'


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

console.log(App, hydrateInitialState)



export const render = async (ctx: any) => {

  // await Promise.all([
  //   () => {
  //       async (dispatch: any) => {
  //         await api.products.getProducts({ sex_id })
  //           .then(res => res.data)
  //           .then((res => {store.dispatch({ type: constants.SET_PRODUCTS_REDUX_STORE, payload: res })}))
  //       }
  //   }
  // ])

  // if (hydrateInitialState) {
  //   hydrateInitialState({products: {products: [], info: {page: 40000000000, total_pages: 58585858}}})
  // }
  

  try {
    const jsx = (
      <ChunkExtractorManager extractor={clientExtractor}>
        {/*<Provider store={store}>*/}
          <StaticRouter location={ctx.path}>
            <App />
          </StaticRouter>
        {/*</Provider>*/}
      </ChunkExtractorManager>
    )
    

    const html = ReactDOMServer.renderToString(jsx)


    // Получаем все необходимые для рендеринга на клиенте скрипты
    const scripts = clientExtractor.getScriptTags()


    // Получаем стили
    const styleTags = clientExtractor.getStyleTags()
    

    // Чистим строку от ссылок перед кэшированием (possible v8 memory leaks)
    return template({ html, preloadedState: {},  styleTags,  scripts }).split('').join('')
  } catch (e) {
    console.log(e)
  }
}
