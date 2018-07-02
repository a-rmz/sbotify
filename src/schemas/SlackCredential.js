/* @flow */

class SlackCredential {
  accessToken: string;
  teamName: string;
  teamId: string;
  botUserId: string;
  botAccessToken: string;

  constructor(credentialResponse: any) {
    this.accessToken = credentialResponse.access_token;
    this.teamName = credentialResponse.team_name;
    this.teamId = credentialResponse.team_id;
    this.botUserId = credentialResponse.bot_user_id;
    this.botAccessToken = credentialResponse.bot_access_token;
  }
}

module.exports = SlackCredential;
