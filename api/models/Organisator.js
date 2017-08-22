/**
 * Organisator.js
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
      unique: true,
      defaultsTo: function() {
        return uuid();
      }
    },
    fullName: {
      type: 'string',
      size: 200,
      required: true
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
    hostedNightsCount: {
      type: 'integer',
      defaultsTo: 0
    },
    playedNightsCount: {
      type: 'integer',
      defaultsTo: 0
    },
    profileInfo: {
      type: 'json',
      defaultsTo: "{}"
    },
    hostedBoardGames: {
      collection: 'boardgamenight',
      via: 'organisator'
    }
  }
};

