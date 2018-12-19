import DarkSky from 'dark-sky'
import config from '../config'

export default new DarkSky(config.services.darksky.key)
