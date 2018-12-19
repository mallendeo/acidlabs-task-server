import socketio from 'socket.io'
import logger from './lib/logger'

import { client } from './lib/redis'

import * as geo from './controllers/geo'
import * as weather from './controllers/weather'

import config from './config'

const io = socketio()

const getForecast = async () => {
  const cities = await geo.getCities()
  return weather.getForecast(cities)
}

const run = async () => {
  await client.hmsetAsync('coords', geo.cityKV)

  setInterval(async () => {
    const forecast = await getForecast()
    io.emit('forecast', forecast)
  }, config.interval)

  io.on('connection', async socket => {
    socket.emit('forecast', await getForecast())
  })

  io.listen(config.port)
  logger.info(`App listening on port ${config.port}`)
}

run()
