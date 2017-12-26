
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const verifyHandler = function (token, tokenSecret, profile, done) {
  process.nextTick(function () {
    User.findOne({facebookId: profile.id}, function (err, user) {
      if (user) {
        done(null, user);
      } else {
        let data = {
          facebookId: profile.id,
          fullName: profile.displayName,
          facebookLink: profile.profileUrl
        };
        User.create(data, function (err, user) {
          done(err, user);
        })
      }
    });
  });
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({id}, function (err, user) {
    done(err, user);
  })
});

module.exports.http = {
  customMiddleware: function (app) {
    passport.use(new FacebookStrategy({
      clientID: sails.config.facebook.clientID,
      clientSecret: sails.config.facebook.clientSecret,
      callbackURL: sails.config.facebook.callBackUrl,
      profileFields: ['displayName', 'link']
    }, verifyHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
};
