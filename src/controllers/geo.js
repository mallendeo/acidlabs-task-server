import { client } from '../lib/redis'
import config from '../config'

export const cityKV = Object.keys(config.coordinates)
  .map(city => [city, JSON.stringify(config.coordinates[city])])
  .flat()

export const getCities = async () => {
  const citiesKeys = await client.hkeysAsync('coords')
  const coords = await client.hmgetAsync('coords', ...citiesKeys)

  return citiesKeys.map((city, i) => ({
    city,
    coords: JSON.parse(coords[i])
  }))
}

export const setCoords = () => client.hmsetAsync('coords', cityKV)
