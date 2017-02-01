import path from 'path';
import {Server} from 'http';
import Express from 'express'
import React from 'react';
import { renderToString } from 'react-dom/server';
import HomePage from './components/HomePage'
import Board from './Board'

const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log(path)

app.use(Express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  let markup = renderToString(<HomePage />)
  res.render('index', {markup});
});

app.get('/standup', (req, res) => {
  let markup = renderToString(<Board/>)
  res.render('index', {markup})
})

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
})
