/* @flow */

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
      .catch(reason => console.log(reason))
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
          const credential: SlackCredential = new SlackCredential();
          credential.accessToken = credentialResponse.access_token;
          credential.teamName = credentialResponse.team_name;
          credential.teamId = credentialResponse.team_id;
          credential.botUserId = credentialResponse.bot_user_id;
          credential.botAccessToken = credentialResponse.bot_access_token;

          return credential;
        })
        .catch(reason => {
          console.log(reason);
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
