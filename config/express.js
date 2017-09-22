
const local = require('./local');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const verifyHandler = (token, tokenSecret, profile, done) => {
  process.nextTick(() => {
    Organisator.findOne({facebook: profile.id}, (err, user) => {
      if (user) {
        done(null, user);
      } else {
        let data = {
          facebook: profile.id,
          fullName: profile.displayName
        };
        Organisator.create(data, (err, user) => {
          done(err, user);
        })
      }
    })
  });
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Organisator.findOne({id}, (err, user) => {
    done(err, user);
  })
});

module.exports.http = {
  customMiddleware: app => {
    passport.use(new FacebookStrategy({
      clientID: local.facebook.clientID,
      clientSecret: local.facebook.clientSecret,
      callbackURL: 'http://localhost:1337/auth/facebook/callback'
    }, verifyHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
};
