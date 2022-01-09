const path = require('path');

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}


//! Метод для підключення eslint лише в дев режимі і лише для .js
const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];


  return loaders;
}

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './src/js/main.js']
  },
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
}


