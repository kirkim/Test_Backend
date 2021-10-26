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
  body('username')
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage('username length should be 1 ~ 16.'),
  body('password')
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage('password length should be 1 ~ 16.'),
  validate,
];

export const signup = [
  ...login,
  body('name')
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage('name length should be 1 ~ 16.'),
  body('confirmPassword')
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage('confirm password length should be 1 ~ 16.'),
  validate,
];

export const edit = [
  body('username')
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage('username length should be 1 ~ 16.'),
  body('password')
    .trim()
    .isLength({ max: 16 })
    .withMessage('password length is too long.'),
  validate,
];

export const post = [
  body('title')
    .isLength({ min: 1, max: 50 })
    .withMessage('title length should be 1 ~ 50.'),
  body('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('content length should be 1 ~ 1500.'),
  validate,
];
