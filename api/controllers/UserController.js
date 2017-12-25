/**
 * UserController
 *
 * @description :: Server-side logic for managing organisators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getCurrentUser: function (req, res) {
    if ( !req.isAuthenticated() ) return res.json({});

    return res.json({user: req.user});
  }
};

