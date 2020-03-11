const LoadablePlugin = require('@loadable/webpack-plugin')



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

const enableLoadable = (config) => {
  config.plugins = config.plugins || []
  config.plugins.push(new LoadablePlugin())


  addBabelPlugin(config, "@loadable/babel-plugin")
}

const enabledEffectorReact = (config) => {
  addBabelPlugin(config, 'effector/babel-plugin')
}


const webpack = function override(config, env) {




  enabledEffectorReact(config)
  enableLoadable(config)

  return config
}

module.exports = webpack
