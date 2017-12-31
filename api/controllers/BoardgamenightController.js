/**
 * BoardgamenightController
 *
 * @description :: Server-side logic for managing boardgamenights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');
const daysInPast = 2;
const daysInFuture = 35;
const daysForRejoin = 28;

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
    }).populate('organisator')
    .populate('players', {
      sort: 'fullName'
    })
    .exec(function (err, boardgamenights) {
      if (err) {
        return res.serverError(err);
      }

      // var boardGameIds = boardgamenights.map(function (x) { return x.boardgameGeekId }).join(',');
      //     console.log(boardGameIds);
      // bgg('thing', {type: 'boardgame', id: boardGameIds, pagesize: 100})
      //   .then(function(results){
      //     console.log(results);
      //   });

      return res.json(boardgamenights);
    });
  },

  join: function(req, res) {
    let boardGameNightId = req.params.id;

    Boardgamenight.findOne({ id: boardGameNightId })
      .populate('players')
      .exec(function (err, boardGameNight) {
        if (err) { return res.serverError(err); }
        if (!boardGameNight) { return res.notFound('Could not find the board game night.'); }
        if (boardGameNight.players.length >= boardGameNight.availablePlayerCount) { return res.forbidden('This board game night is full.'); }

        User.findOne({ id: req.user.id }, function (err, user) {
          if (err) { return res.serverError(err); }
          if (!user) { return res.notFound('Could not find the user.'); }

          // Check last 4 weeks for same organisator
          NightPlayer.find({
            where: { 
              player: user.id,
              updatedAt: {
                '>=': moment().subtract(daysForRejoin, 'd').toDate(),
                '<=': moment().toDate() 
              }
            },
            limit: 1,
            sort: 'updatedAt DESC'
          }).populate('boardgamenight', { 
            where: { 
              organisator: boardGameNight.organisator
            }
          }).exec(function (err, links) {
            if (err) { return res.serverError(err); }

            if (links.length > 0) { return res.forbidden('You already joined this host in the last ' + daysForRejoin + ' days.'); }

            boardGameNight.players.add(user.id);
            boardGameNight.save(function(err) {
              if (err) { return res.serverError(err); }
              return res.ok({});
            });
          });
        });
      });
  },

  leave: function(req, res) {
    let boardGameNightId = req.params.id;

    Boardgamenight.findOne({ id: boardGameNightId })
      .populate('players')
      .exec(function (err, boardGameNight) {
        if (err) { return res.serverError(err); }
        if (!boardGameNight) { return res.notFound('Could not find the board game night.'); }

        var playersMatching = boardGameNight.players.filter(function (player) { return player.id === req.user.id });
        if (playersMatching === 0) { return res.forbidden('You are not at this table.'); }

        User.findOne({ id: req.user.id }, function (err, user) {
          if (err) { return res.serverError(err); }
          if (!user) { return res.notFound('Could not find the user.'); }

          boardGameNight.players.remove(user.id);
          boardGameNight.save(function(err) {
            if (err) { return res.serverError(err); }
            return res.ok({});
          });
        });
      });
  },

  update: function (req, res) {
    let boardGameNightId = req.params.id;

    Boardgamenight.findOne({ id: boardGameNightId })
      .populate('players')
      .exec(function (err, boardGameNight) {
        if (err) { return res.serverError(err); }
        if (!boardGameNight) { return res.notFound('Could not find the board game night.'); }

        let updatedBoardGameNight = req.body;
        Boardgamenight.update(
          { id: boardGameNightId },
          {
            boardgameName: updatedBoardGameNight.boardgameName,
            complexity: updatedBoardGameNight.complexity,
            dateTime: updatedBoardGameNight.dateTime,
            availablePlayerCount: updatedBoardGameNight.availablePlayerCount,
            totalPlayerCount: updatedBoardGameNight.totalPlayerCount,
            street: updatedBoardGameNight.street,
            postcode: updatedBoardGameNight.postcode,
            city: updatedBoardGameNight.city
          }
        ).exec(function (error, updated) {
          if (error) { return res.serverError(error); }
          return res.ok({});
        });
      });
  }
}

