export const publicOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash('error', 'Not authorized');
    return res.redirect('/posts');
  }
};

export const loginOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash('error', 'Log in first');
    return res.redirect('/users/login');
  }
};
