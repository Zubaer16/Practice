import mongoose from 'mongoose'
import toJSON from './plugins/toJSON.plugin.js'
import { tokenTypes } from '../config/token.js'

const tokenSchema = mongoose.Schema(
  {
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
    type: {
      type: String,
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

tokenSchema.plugin(toJson)

/**
 * @typedef Token
 */

const Token = mongoose.model('Token', tokenSchema)

export default Token
