import redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis)

export const client = redis.createClient()

export default redis
