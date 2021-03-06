/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

var databaseUrl = process.env.DATABASE_URL;
var facebookClientId = process.env.FACEBOOK_CLIENT_ID;
var facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;
var facebookCallBackUrl = process.env.FACEBOOK_CALLBACK_URL;
module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  connections: {
    postgres: {
      adapter: 'sails-postgresql',
      ssl: true,
      url: databaseUrl
    }
  },
  models: {
    migrate: 'safe'
  },
  facebook: {
    clientID: facebookClientId,
    clientSecret: facebookClientSecret,
    callBackUrl: facebookCallBackUrl
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: process.env.PORT || 5000,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
