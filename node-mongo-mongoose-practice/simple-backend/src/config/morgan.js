import morgan from 'morgan'
import config from './config.js'
import logger from './logger.js'

morgan.token('message', (req, res) => res.locals.erroMessage || '')

const getIpFormat = () => {
  config.env === 'production' ? ':remote-addr - ' : ''
}
