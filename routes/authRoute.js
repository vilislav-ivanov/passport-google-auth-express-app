const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
      successRedirect: '/auth/account',
    })
  );

  app.get('/auth/account', (req, res) => {
    return res.json({ msg: 'Logged in', user: req.user });
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    return res.json({ msg: 'Logged out', user: req.user });
  });

  app.get('/auth/test', passport.authenticate('google'), (req, res, next) => {
    return res.json({ msg: 'Testing...', user: req.user });
  });
};
