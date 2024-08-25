const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'students',
  password: '2233',
  port: '5432',
})

module.exports = pool
