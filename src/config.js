import dotenv from 'dotenv'
import { COORDS } from './fixtures'

dotenv.config()

const {
  PORT = 3001,
  DARKSKY_API_KEY,
  NODE_ENV,
  REDIS_URL,
  REQ_INTERVAL
} = process.env

export default {
  failureProb: 0.1,
  interval: REQ_INTERVAL ? Number(REQ_INTERVAL) : 10000, // in ms
  port: PORT,
  env: NODE_ENV,
  redisURL: REDIS_URL,
  coordinates: COORDS,
  services: {
    darksky: {
      key: DARKSKY_API_KEY
    }
  }
}
