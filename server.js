const path = require('path');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: '/js/',
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);

    return;
  }

  console.log('Listening at http://localhost:3000/');
});
