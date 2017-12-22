/**
 * OrganisatorController
 *
 * @description :: Server-side logic for managing organisators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	checkUser: function (req, res) {
    var requestUser = req.body.user;
    User.findOne({
      facebookId: requestUser.facebookId
    }).exec(function (err, user) {
      if (user) {
        return res.json(user);
      } else {
        var newUser = User.create({
          facebookId: requestUser.facebookId,
          fullName: requestUser.fullName
        }).exec(function (err, record) {
          return res.json(record);
        });
      }
    });
  }
};

