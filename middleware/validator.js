import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  req.flash('error', errors.errors[0].msg);
  return res.status(400).redirect('/users/login');
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

export const post = [
  body('title').notEmpty().withMessage('title have to be exist.'),
  body('content').notEmpty().withMessage('pleas enter content!'),
  validate,
];
