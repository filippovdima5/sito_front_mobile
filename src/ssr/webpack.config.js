const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')


const commonPresets = [
  [
    '@babel/preset-env',
    {
      'targets': {
        'browsers': ['>0.5%', 'last 2 versions', 'ie >= 10']
      }
    }
  ],
  '@babel/preset-react'
]

const babelConfig = {
  'plugins': [
    ['@babel/transform-runtime',
      {
        'corejs': 2
      }
    ],
    '@loadable/babel-plugin',
    '@babel/transform-async-to-generator',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-export-namespace-from',
    '@babel/plugin-proposal-optional-chaining',
    'transform-export-extensions'
  ],
  'overrides': [
    {
      'test': [
        './src/**/*.ts',
        './src/**/*.tsx'
      ],
      'presets': [
        '@babel/preset-typescript',
        ...commonPresets
      ]
    },
    {
      'test': [
        './src/**/*.js',
        './src/**/*.jsx'
      ],
      'presets': [
        '@babel/preset-flow',
        ...commonPresets
      ]
    }
  ]
}

const serverEntryConfig = {
  context: path.resolve(__dirname, '..'),
  watch: process.env.WATCH === 'true',
  mode: 'development',
  name: 'server',
  target: 'async-node',
  optimization: {
    minimize: false,
  },
  entry: {
    server: './ssr/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'build'),
    filename: 'server.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', 'src'],
  },
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals({
      whitelist: [
        /normalize\.css/,
        /@babel\/runtime\/.+/
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /(node_modules\/)/,
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: /\.css$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
        },
        sideEffects: true,
      },
      {
        test: /\.scss$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
        },
        sideEffects: true,
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
          name: 'media/[name].[hash:8].[ext]',
        },
        sideEffects: true,
      },

      {
        test: /\.(png|jpg|svg|ico|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'media/[name].[hash:8].[ext]',
          emitFile: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['REACT_APP_ENV'])
  ],
}

module.exports = serverEntryConfig
