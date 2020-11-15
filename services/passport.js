const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const { googleClientID, googleClientSecret } = require('../config/keys');

passport.use(
  new Strategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (!user) {
            // Register user
            const newUser = new User({ googleId: profile.id });
            newUser
              .save()
              .then((createdUser) => {
                return done(null, createdUser);
              })
              .catch((err) => {
                return done(err, null);
              });
          } else {
            // Login user
            return done(null, user);
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
