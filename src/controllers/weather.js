import Promise from 'bluebird'

import { client } from '../lib/redis'
import logger from '../lib/logger'
import darksky from '../lib/darksky'
import config from '../config'

import { mayThrow, retryUntil } from '../lib/helpers'
import { ApiError } from '../lib/errors'

/**
 * Get forecast for a city
 * @param {object} city { coords: [number, number], city: string }
 * @returns {object}
 * @throws {ApiError}
 */
export const getCityForecast = async city => {
  logger.info('Get forecast', city.city)

  mayThrow(config.failureProb, ApiError('How unfortunate! The API Request Failed', city))

  const cacheKey = 'fc.cache'
  const cached = await client.hgetAsync(cacheKey, city.city)

  const isProd = config.env === 'production'

  if (cached && !isProd) {
    logger.info(`Got forecast from cache`, city.city)
    return JSON.parse(cached)
  }

  const forecast = await darksky
    .options({
      latitude: city.coords[0],
      longitude: city.coords[1],
      language: 'es',
      units: 'ca'
    })
    .get()

  const payload = {
    ...city,
    forecast: forecast.currently,
    tz: forecast.timezone
  }

  if (!isProd) {
    await client.hsetAsync(cacheKey, city.city, JSON.stringify(payload))
    client.expire(cacheKey, 600)
  }

  return payload
}

/**
 * Get forecast from an array of cities
 *
 * @param {array[object]} cities Array of cities { coords: [num, num], city: string }
 * @returns {array[object]}
 * @example
 *  getForecast([
 *    { coords: [-33.448891, -70.669266], city: 'Santiago' },
 *    //...
 *  ])
 */
export const getForecast = async cities => {
  return Promise.map(cities, async city => (
    retryUntil(async () => getCityForecast(city), undefined, err => {
      logger.error(err.message)

      if (err && err.name === 'ApiError') {
        client.hset('api.errors', Date.now(), JSON.stringify({
          message: err.message,
          info: err.extra
        }))
      }
    })
  ), { concurrency: 3 })
}
