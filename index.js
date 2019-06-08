'use strict'

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { PORT, CLIENT_ORIGIN } = require('./config')
const { dbConnect } = require('./db-mongoose')
// const {dbConnect} = require('./db-knex');

const app = express()
const cheese = require('./seedCheese')
const simbDB = require('./simDB')
const cheeses = simbDB.initialize(cheese)


app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test',
  }),
)

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
)

app.get('/api/cheeses', (err, res) => {
  res.status(200)
  res.json([
    'Bath Blue',
    'Barkham Blue',
    'Buxton Blue',
    'Cheshire Blue',
    'Devon Blue',
    'Dorset Blue Vinney',
    'Dovedale',
    'Exmoor Blue',
    'Harbourne Blue',
    'Lanark Blue',
    'Lymeswold',
    'Oxford Blue',
    'Shropshire Blue',
    'Stichelton',
    'Stilton',
    'Blue Wensleydale',
    'Yorkshire Blue',
  ])
})

app.post('/api/cheeses', (req, res, next) => {
  const cheeses = req.body
  const newCheese = { cheeses }
  cheeses.create(newCheese, (err, data) => {
    if (err) {
      return next(err)
    }
    if (data) {
      console.log(res.body)
      res
        .location(`http://${req.headers.host}/api/cheeses/`)
        .status(201)
        .json(data)
    } else {
      next()
    }
  })
})

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`)
    })
    .on('error', err => {
      console.error('Express failed to start')
      console.error(err)
    })
}

if (require.main === module) {
  dbConnect()
  runServer()
}

module.exports = { app }
