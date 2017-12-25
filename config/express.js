
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const verifyHandler = (token, tokenSecret, profile, done) => {
  process.nextTick(() => {
    User.findOne({facebookId: profile.id}, (err, user) => {
      if (user) {
        done(null, user);
      } else {
        let data = {
          facebookId: profile.id,
          fullName: profile.displayName,
          facebookLink: profile.profileUrl
        };
        User.create(data, (err, user) => {
          done(err, user);
        })
      }
    });
  });
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({id}, (err, user) => {
    done(err, user);
  })
});

module.exports.http = {
  customMiddleware: app => {
    passport.use(new FacebookStrategy({
      clientID: sails.config.facebook.clientID,
      clientSecret: sails.config.facebook.clientSecret,
      callbackURL: 'http://localhost:1337/api/auth/facebook/callback',
      profileFields: ['displayName', 'link']
    }, verifyHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
};
