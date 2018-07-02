/* @flow */

const logger = require('../lib/logger');

const db = require('../lib/db');
const SlackCredential = require('../schemas/SlackCredential');

class SlackCredentialModel {

  static save(cred: SlackCredential): any {
    return db.then(connection =>
      connection.query(
        `INSERT INTO SlackCredentials (team_id, team_name, access_token, bot_user_id, bot_access_token)
        VALUES(?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        team_name = ?, access_token = ?, bot_user_id = ?, bot_access_token = ?;`,
        [cred.teamId, cred.teamName, cred.accessToken, cred.botUserId, cred.botAccessToken,
          cred.teamName, cred.accessToken, cred.botUserId, cred.botAccessToken]
      )
      .catch(reason => logger.error(reason))
    );
  }

  static retrieve(teamId: string): Promise<SlackCredential> {
    return db.then(connection => connection.query(
      'SELECT * FROM SlackCredentials WHERE team_id = ?',
      [teamId]
    ))
    .then(([credentialResponse, _]) => {
      const credential: SlackCredential = new SlackCredential(credentialResponse[0]);

      return credential;
    })
    .catch(reason => {
      logger.error(reason);
      return new SlackCredential();
    });
  }

  static remove(teamId: string): void {

  }
}

module.exports = SlackCredentialModel;
