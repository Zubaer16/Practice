export default {
  schema: './db.js',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: 'localhost',
    user: 'postgres',
    password: '2233',
    database: 'user_roles',
  },
}
