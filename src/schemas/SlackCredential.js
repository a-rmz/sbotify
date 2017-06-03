/* @flow */

class SlackCredential {
  accessToken: string;
  teamName: string;
  teamId: string;
  botUserId: string;
  botAccessToken: string;

  constructor(credentialResponse: any) {
    this.accessToken = credentialResponse.accessToken;
    this.teamName = credentialResponse.teamName;
    this.teamId = credentialResponse.teamId;
    this.botUserId = credentialResponse.botUserId;
    this.botAccessToken = credentialResponse.botAccessToken;
  }
}

module.exports = SlackCredential;
