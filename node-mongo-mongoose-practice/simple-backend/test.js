import Joi from 'joi'

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    // password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
}

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key]
    }
    return obj
  }, {})
}

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ')
    console.error('Validation Error:', errorMessage) // Log error for testing
    return next(`Validation Error: ${errorMessage}`) // Simulate error handling
  }
  Object.assign(req, value)
  return next() // Continue middleware
}

// Simulate request, response, and next
const req = {
  body: {
    email: 'zubaer.ahmed7690@gmail.com', // Invalid email
    name: 'John Doe',
    role: 'admin',
  },
}

const res = {}

const next = (result) => {
  if (result) {
    console.error(result)
  } else {
    console.log('Validation passed:', req)
  }
}

const myValid = validate(createUser)
myValid(req, res, next)
