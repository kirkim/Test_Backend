import * as postDb from '../db/postData.js';
import * as userDb from '../db/userData.js';

export const publicOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash('error', 'Not authorized');
    return res.redirect('/posts/list');
  }
};

export const loginOnly = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash('error', 'Log in first');
    return res.redirect('/users/login');
  }
};

export const existPost = async (req, res, next) => {
  const { no: id } = req.query;
  const exist = await postDb.findById(id);
  if (exist) {
    next();
  } else {
    return res.redirect('/posts/list');
  }
};
