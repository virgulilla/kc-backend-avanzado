import { query, validationResult } from 'express-validator'

const validateProductFilters = [
  query('tag')
    .optional()
    .isString().withMessage('El tag debe ser una cadena')
    .trim()
    .escape(),

  query('min')
    .optional()
    .isFloat({ min: 0 }).withMessage('El precio mínimo debe ser un número positivo')
    .toFloat(),

  query('max')
    .optional()
    .isFloat({ min: 0 }).withMessage('El precio máximo debe ser un número positivo')
    .toFloat(),

  query('name')
    .optional()
    .isString().withMessage('El nombre debe ser una cadena')
    .trim()
    .escape(),

  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('La página debe ser un número entero mayor que 0')
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('El límite debe ser un número entre 1 y 100')
    .toInt(),

  query('sort')
    .optional()
    .isIn(['name', 'price', '-price']).withMessage('El campo sort no es válido')
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {      
        const errorMessages = errors.array().map(err => err.msg)
        req.flash('error', errorMessages)
        return res.redirect('/products')
    }
    next();
  }
]

export default validateProductFilters
