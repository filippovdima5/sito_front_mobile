const LoadablePlugin = require('@loadable/webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')


const addBabelPlugin = (config, name, { prepend } = {}) => {
  const babel = findBabelPlugin(config)

  babel.options.plugins = babel.options.plugins || []
  const method = prepend ? 'unshift' : 'push'
  babel.options.plugins[method](require.resolve(name))
}

const getLoaders = (config) => {
  const { rules } = config.module
  const runtimeLoaders = rules.find(item => 'oneOf' in item) || {}
  return runtimeLoaders.oneOf || []
}

const findBabelPlugin = (config) => {
  const loaders = getLoaders(config)
  const babelLoaderConfig = loaders.find(item => item.options && item.options.babelrc !== undefined && item.test.test('a.tsx'))

  return babelLoaderConfig
}

const enableLoadable = (config, client = true) => {
  if (client) {
    config.plugins = config.plugins || []
    config.plugins.push(new LoadablePlugin())
  }

  addBabelPlugin(config, "@loadable/babel-plugin")
  addBabelPlugin({ "addLoc": true }, 'effector/babel-plugin')
}



const adjustConfigForServer = (config) => {
  addBabelPlugin(config, "@babel/plugin-proposal-optional-chaining")

  const isServer = process.env.SERVER === 'true'
  if (isServer) {
    const serverConfig = {...config}

    serverConfig.target = 'node'
    delete serverConfig.optimization
    serverConfig.entry = path.resolve(__dirname, 'src', 'server', 'index.ts')
    serverConfig.output = {...config.output}
    serverConfig.output.path = path.resolve(__dirname, 'build', 'server')
    serverConfig.output.filename = 'server.js'
    serverConfig.node = {
      __dirname: false,
    }
    serverConfig.externals = [
      nodeExternals({
        whitelist: [
          /normalize\.css/,
          /@babel\/runtime\/.+/
        ],
      })
    ]

    return [config, serverConfig]
  }

  return config
}

const webpack = function override(config, env) {

  config.optimization.splitChunks =  {
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        enforce: true
      },
    }
  }
  config.optimization.runtimeChunk = false


  enableLoadable(config)

  return adjustConfigForServer(config)
}

module.exports = webpack
