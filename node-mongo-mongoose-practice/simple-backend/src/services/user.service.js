import httpStatus from 'http-status'
import { User, Token } from '../models/index.js'
import ApiError from '../utils/ApiError.js'

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken')
  }

  return User.create()
}

/**
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options)
  return users
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getUserById = async (id) => {
  return User.findById(id)
}
