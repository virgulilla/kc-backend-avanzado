import { query, validationResult } from 'express-validator'

export const isAuthenticated = (req, res, next)  => {
  if (req.session.userId) return next()
  res.redirect('/login')
}


export const validateUserFields = [
  query('email')
    .notEmpty().withMessage('Debe indicar un email')
    .isEmail().withMessage('No es un email valido')
    .trim()
    .escape(),

  query('password')
    .notEmpty().withMessage('Debe informar la contraseña')
    .trim()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req.body)
    if (!errors.isEmpty()) {      
        const errorMessages = errors.array().map(err => err.msg)
        req.flash('error', errorMessages)
        return res.redirect('/login')
    }
    next();
  }
]