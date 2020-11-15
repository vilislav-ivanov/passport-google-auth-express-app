const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const { cookieSessionKey } = require('../config/keys');

const User = mongoose.model('User');

module.exports = (app) => {
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [cookieSessionKey],
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
