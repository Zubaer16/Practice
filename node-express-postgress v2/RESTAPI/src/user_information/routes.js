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
  login,
  verifyToken,
} from './auth.js'

const router = Router()

router.post('/', verifyToken, getAllPermission, addUserInfo)
router.get('/', verifyToken, getAllPermission, allUsers)
router.get('/:id', verifyToken, getSinglePermission, getUserbyId)
router.put('/:id', verifyToken, getSinglePermission, putUserbyId)
router.post('/login', login)
router.delete('/:id', verifyToken, getSinglePermission, deleteUserById)

export default router
