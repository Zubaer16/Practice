import { Router } from 'express'
import {
  addUserInfo,
  allUsers,
  deleteUserById,
  getUserbyId,
  putUserbyId,
} from './controller.js'
import {
  getAllPermission,
  getSinglePermission,
  getToken,
  login,
  verifyToken,
} from './auth.js'

const router = Router()

router.get('/', verifyToken, getAllPermission, allUsers)
router.get('/:id', verifyToken, getSinglePermission, getUserbyId)
router.post('/getRefreshtoken', getToken)
router.post('/', verifyToken, getAllPermission, addUserInfo)
router.post('/login', login)
router.put('/:id', verifyToken, getSinglePermission, putUserbyId)
router.delete('/:id', verifyToken, getSinglePermission, deleteUserById)

export default router
