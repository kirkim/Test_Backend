import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

export const login = [
  body('username').trim().notEmpty().withMessage('username should be exist.'),
  body('password').trim().notEmpty().withMessage('password should be exist.'),
  validate,
];

export const signup = [
  ...login,
  body('name').notEmpty().withMessage('name is missing'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('confirm password should be exist.'),
  validate,
];
