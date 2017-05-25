/* @flow */

const CardTemplate = require('./CardTemplate');

class ResponseTemplate {

  text: string;
  attachments: CardTemplate[];

  constructor(text: string, attachments: CardTemplate[] = []) {
    this.text = text;
    this.attachments = attachments;
  }

  toString(): string {
    const str = {
      text: this.text,
      attachments: this.attachments
    };
    return JSON.stringify(str);
  }

}

module.exports = ResponseTemplate;
