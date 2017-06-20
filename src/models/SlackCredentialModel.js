/* @flow */

const logger = require('../lib/logger');

const sqlite = require('sqlite');
const dbConfig = require('../config/db');
const SlackCredential = require('../schemas/SlackCredential');

class SlackCredentialModel {

  static save(cred: SlackCredential): void {
    sqlite.open(dbConfig.dbPath)
    .then(a => {
      sqlite.run(
        `REPLACE INTO ${dbConfig.slack.dbTable}(team_id, team_name, access_token, bot_user_id, bot_access_token)
        VALUES("${cred.teamId}", "${cred.teamName}", "${cred.accessToken}", "${cred.botUserId}", "${cred.botAccessToken}");`
      )
      .catch(reason => logger.error(reason))
      .then(a => {
        sqlite.close();
      });
    });
  }

  static retrieve(teamId: string): Promise<SlackCredential> {
    return sqlite.open(dbConfig.dbPath)
      .then(a => {
        return sqlite.get(
          `SELECT * FROM ${dbConfig.slack.dbTable} WHERE team_id="${teamId}"`
        )
        .then(credentialResponse => {
          const credential: SlackCredential = new SlackCredential({
            accessToken: credentialResponse.access_token,
            teamName: credentialResponse.team_name,
            teamId: credentialResponse.team_id,
            botUserId: credentialResponse.bot_user_id,
            botAccessToken: credentialResponse.bot_access_token
          });

          return credential;
        })
        .catch(reason => {
          logger.error(reason);
          return new SlackCredential();
        })
        .then(creds => {
          sqlite.close();
          return creds;
        });
      });
  }

  static remove(teamId: string): void {

  }
}

module.exports = SlackCredentialModel;
