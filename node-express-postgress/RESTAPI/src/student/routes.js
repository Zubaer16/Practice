const { Router } = require('express')
const controller = require('./controller')
const router = Router()

router.get('/', controller.getStudents)
router.get('/empUsers', controller.getEmpUsers)
router.get('/:id', controller.getStudentById)
router.post('/', controller.addStudent)
router.put('/:id', controller.updateStudent)
router.delete('/:id', controller.removeStudent)
router.post('/empUsers', controller.addEmpUsers)
router.post('/empLogin', controller.loginEmpUser)

module.exports = router
