const getStudents = 'SELECT * FROM students'
const getStudentById = 'SELECT * FROM students where id = $1'
const checkEmailExists = 'SELECT s FROM students s where s.email = $1'
const checkEmailExistsEmp = 'SELECT s FROM emp_users s where s.email = $1'
const checkUserRole =
  'SELECT s FROM emp_users s where s.email = $1 and status = 1'
const addStudent =
  'INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)'

const removeStudent = 'DELETE  FROM students  where id = $1 '
const updateStudent = 'UPDATE students SET name = $1 where id = $2'
const getEmpUsers = 'SELECT * FROM emp_users'
const addEmpUsers =
  'INSERT INTO emp_users (id,email, password) VALUES ($1, $2, $3)'

module.exports = {
  getStudents,
  getStudentById,
  checkEmailExists,
  addStudent,
  removeStudent,
  updateStudent,
  getEmpUsers,
  addEmpUsers,
  checkEmailExistsEmp,
  checkUserRole,
}
