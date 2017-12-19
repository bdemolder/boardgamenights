/**
 * Boardgamenight.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const uuid = require('uuid/v4');

module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      defaultsTo: function() {
        return uuid();
      }
    },
    boardgameName: {
      type: 'string',
      required: true,
      size: 200
    },
    complexity: {
      type: 'integer',
      required: true
    },
    boardgameGeekId: {
      type: 'string',
      required: false
    },
    boardgameGeekLink: {
      type: 'string',
      required: false
    },
    boardgameGeekImage: {
      type: 'string',
      required: false
    },
    street: {
      type: 'string',
      size: 200,
      required: true
    },
    postcode: {
      type: 'string',
      size: 100,
      required: true
    },
    city: {
      type: 'string',
      size: 200,
      required: true
    },
    availablePlayerCount: {
      type: 'integer',
      required: true
    },
    totalPlayerCount: {
      type: 'integer',
      required: true
    },
    dateTime: {
      type: 'datetime',
      required: true
    },
    organisator: {
      model: 'organisator'
    },
    players: {
      type: 'json',
      defaultsTo: function() {
        return [];
      }
    }
  }
};

