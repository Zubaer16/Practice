import winston, { error } from 'winston'
import config from './config.js'
import { object } from 'joi'

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    object.assign(info, { message: info.stack })
  }
  return error
})

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
})

export default logger
