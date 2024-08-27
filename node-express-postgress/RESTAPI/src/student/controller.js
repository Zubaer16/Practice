const pool = require('../../db')
const queries = require('./queries')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}
const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body
  //check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    //check if email exists
    if (results.rows.length) {
      res.send('Email already exists')
    }

    //add student to db
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error
        res.status(201).send('Student created successfully!')
      }
    )
  })
}

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length
    if (noStudentFound) {
      res.send('Student does not exist in the database')
    }
    pool.query(queries.removeStudent, [id], (error, result) => {
      if (error) throw error
      res.status(200).send('Student removed successfully')
    })
  })
}

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id)
  const { name } = req.body
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length
    if (noStudentFound) {
      res.send('Student does not exist in the database')
    }
    pool.query(queries.updateStudent, [name, id], (error, resluts) => {
      if (error) throw error
      res.status(200).send('Student updated successfully')
    })
  })
}

const getEmpUsers = (req, res) => {
  pool.query(queries.getEmpUsers, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const addEmpUsers = (req, res) => {
  const { id, email, password } = req.body
  //check if email exists
  pool.query(queries.checkEmailExistsEmp, [email], (error, results) => {
    //check if email exists
    if (results.rows.length) {
      res.send('Email already exists')
    }
    results.rows[0]
    //add student to db
    pool.query(queries.addEmpUsers, [id, email, password], (error, results) => {
      if (error) throw error
      res.status(201).send('Employee created successfully!')
    })
  })
}

const loginEmpUser = async (req, res) => {
  const { email, password } = req.body
  const result = await pool.query('SELECT * FROM emp_users where email = $1', [
    email,
  ])

  const user = result.rows[0]

  if (!user) {
    return res.status(400).json({ message: 'Invalid email' })
  }

  if (user.password != req.body.password) {
    return res
      .status(400)
      .json({ message: 'Username and password do not match' })
  }

  const token = JWT.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  })
  res.send({ token })
}

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
  getEmpUsers,
  addEmpUsers,
  loginEmpUser,
}
