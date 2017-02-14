/* eslint-disable no-console */

const last = require('lodash').last;
const open = require('open');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const morgan = require('morgan');
const proxy = require('proxy-middleware');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const app = express();
const server = new WebpackDevServer(webpack(config), config.devServer);

server.listen(4000, 'localhost', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`
      =====================================================
       WebpackDevServer listen at http://localhost:${4000}
      =====================================================
    `);
  }
});

app.use(morgan('dev'));
app.use('/js', proxy('http://localhost:4000/js'));
app.use((req, res) => {
  const options = { root: path.join(__dirname, 'dist') };
  const isJS = !!req.originalUrl.match(/\.js$/);
  const filename = isJS ? last(req.originalUrl.split('/')) : 'index.html';

  return res.sendFile(filename, options, (err) => {
    if (err) {
      res.status(404).send({
        code: 404,
        msg: 'All is not right in the world :(',
      });
    }
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    open(`http://localhost:${3000}`);
  }
});
