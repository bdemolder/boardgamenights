# Requirements

- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/) (8.4.0+)
- [Sails](http://sailsjs.org) (0.12+)
- [PostgreSQL](https://www.postgresql.org/) (Originally made against a 9.6)

# How to debug/deploy locally

- Clone the git code
- Setup a database in PostgreSQL
- Add local.js file in /config with following:
```javascript
module.exports = {
   environment: process.env.NODE_ENV || 'development',
   connections: {
     postgres: {
       adapter: 'sails-postgresql',
       host: 'Your Hostname',
       port: 1234,
       user: 'Your username for the database',
       password: 'Your password for the username',
       database: 'Your database name'
     }
   }
}
```
- Open command prompt and navigate to the cloned folder
- Execute `yarn install` (Will install all packages mentioned in packages.config
- Execute `sails lift` (Will deploy the application and run it on port 1337 by default - use `--port 1234` to change)

# How to contribute

- Do not commit/push directly on master, this branch is tied to a heroku, this should remain stable at all times. So work with a seperate branch, and commit all you want there, then create pull request and approve that one yourself or if you are unsure, ask one of the other collaborators.
- Squash merge of the pull request is allowed, to keep the history a bit cleaner
- Please write proper and good commit messages ([Guide](https://github.com/erlang/otp/wiki/writing-good-commit-messages))
- local.js will always be ignored, the DB connection is injected through heroku, so no need to worry about the DB connection
- Use spaces, not tabs, 2 spaces = 1 tab

If anything forementioned needs revision, we will listen.
