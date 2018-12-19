import dotenv from 'dotenv'
import { COORDS } from './fixtures'

dotenv.config()

const {
  PORT = 3000,
  DARKSKY_API_KEY,
  NODE_ENV,
  REDIS_URL
} = process.env

export default {
  failureProb: 0.1,
  interval: 10 * 60 * 1000, // in ms
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
