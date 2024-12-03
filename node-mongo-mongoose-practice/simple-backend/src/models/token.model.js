import mongoose from 'mongoose'
import { toJson } from './plugins/toJSON.plugin.js'
import { tokenTypes } from '../config/token.js'

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  user: {
    type: mongoose.SchemaType.ObjectId,
    ref: 'User',
    required: true,
  },
  type: String,
  enum: [tokenTypes.REFRESH, token],
})
