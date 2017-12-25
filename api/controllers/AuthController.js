/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');

// http://calderonroberto.com/blog/sails-and-facebook-login-using-passport/
module.exports = {
  logout: function (req, res) {
    req.logout();
    res.redirect('/login');
  },

  facebook: function (req, res) {
    passport.authenticate(
      'facebook',
      { failureRedirect: '/login' },
      function (err, user) {
        req.logIn(user, function (err) {
          if (err) {
            console.error(err);
            res.view('500');
          } else {
            res.redirect('/');
          }
        });
      }
    )(req, res);
  }
};

