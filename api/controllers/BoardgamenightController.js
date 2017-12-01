/**
 * BoardgamenightController
 *
 * @description :: Server-side logic for managing boardgamenights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');
const daysInPast = 2;
const daysInFuture = 35;

// var options = {
//   timeout: 10000, // timeout of 10s (5s is the default)

//   // see https://github.com/cujojs/rest/blob/master/docs/interceptors.md#module-rest/interceptor/retry
//   retry: {
//     initial: 100,
//     multiplier: 2,
//     max: 15e3
//   }
// }
// var bgg = require('bgg')(options);

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
    }).populate('organisator').exec(function (err, boardgamenights) {
      if (err) {
        return res.serverError(err);
      }

      // var boardGameIds = boardgamenights.map(x => x.boardgameGeekId).join(',');
      //     console.log(boardGameIds);
      // bgg('thing', {type: 'boardgame', id: boardGameIds, pagesize: 100})
      //   .then(function(results){
      //     console.log(results);
      //   });

      return res.json(boardgamenights);
    });
  }
};

