import redis from 'redis'
import bluebird from 'bluebird'

import config from '../config'
import logger from './logger'

bluebird.promisifyAll(redis)

export const client = redis.createClient(config.redisURL)

client.on('error', err => {
  logger.error(`Redis error: ${err.message}`)
})

export default redis
