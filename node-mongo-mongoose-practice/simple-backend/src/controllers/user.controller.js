import httpStatus from 'http-status'
import pick from '../utils/pick.js'
import ApiError from '../utils/ApiError.js'
import catchAsync from '../utils/catchAsync.js'
import {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
} from '../services/index.js'
import { userService } from '../services/index.js'

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser
})
