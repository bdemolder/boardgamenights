/**
 * BoardgamenightController
 *
 * @description :: Server-side logic for managing boardgamenights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');
const daysInPast = 2;
const daysInFuture = 35;

module.exports = {
	getCalendar: function(req, res) {
    Boardgamenight.find({
      where : {
        dateTime: { 
          '>=': moment().subtract(daysInPast, 'd').toDate(), 
          '<=': moment().add(daysInFuture, 'd').toDate() 
        }
      },
      sort: { 
        dateTime: 1, 
        boardgameName: 1
      }
    }).exec(function (err, boardgamenights) {
      if (err) {
        return res.serverError(err);
      }

      return res.json(boardgamenights);
    });
  }
};

