const { Router } = require('express')
const controller = require('./controller')
const router = Router()

router.get(
  '/',
  controller.verifyToken,
  controller.checkPermission,
  controller.getStudents
)
router.get(
  '/refresh',
  controller.verifyRefreshToken,
  controller.checkPermission,
  controller.getStudents
)
router.get(
  '/:id',
  controller.verifyToken,
  controller.checkPermission,
  controller.getStudentById
)
router.get(
  '/refresh/:id',
  controller.verifyRefreshToken,
  controller.checkPermission,
  controller.getStudentById
)
router.post(
  '/',
  controller.verifyToken,
  controller.checkPermission,
  controller.addStudent
)
router.post(
  '/refresh/',
  controller.verifyRefreshToken,
  controller.checkPermission,
  controller.addStudent
)
router.put(
  '/:id',
  controller.verifyToken,
  controller.checkPermission,
  controller.updateStudent
)
router.put(
  '/refresh/:id',
  controller.verifyRefreshToken,
  controller.checkPermission,
  controller.updateStudent
)
router.delete(
  '/:id',
  controller.verifyToken,
  controller.checkPermission,
  controller.removeStudent
)
router.delete(
  '/refresh/:id',
  controller.verifyRefreshToken,
  controller.checkPermission,
  controller.removeStudent
)

module.exports = router
