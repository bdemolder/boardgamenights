/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');

// http://calderonroberto.com/blog/sails-and-facebook-login-using-passport/
module.exports = {
  login: (req, res) => {
    res.view();
  },

  logout: (req, res) => {
    req.logout();
    res.redirect('/home');
  },

  facebook: (req, res) => {
    passport.authenticate(
      'facebook',
      { failureRedirect: '/login' },
      (err, user) => {
        req.logIn(user, err => {
          if (err) {
            console.error(err);
            res.view('500');
          } else {
            res.redirect('/home');
          }
        });
      }
    )(req, res);
  }
};

