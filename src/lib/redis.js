import redis from 'redis'
import bluebird from 'bluebird'
import config from '../config'

bluebird.promisifyAll(redis)

export const client = redis.createClient(config.redisURL)

export default redis
