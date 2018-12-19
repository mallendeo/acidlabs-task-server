import dotenv from 'dotenv'
import { COORDS } from './fixtures'

dotenv.config()

const {
  PORT = 3001,
  DARKSKY_API_KEY,
  NODE_ENV
} = process.env

export default {
  port: PORT,
  coordinates: COORDS,
  failureProb: 0.1,
  interval: 10 * 60 * 1000,
  env: NODE_ENV,
  services: {
    darksky: {
      key: DARKSKY_API_KEY
    }
  }
}
