/* @flow */

/**
 * @private
 * Inner class to represent a field of the attachment
 */
class _Field {
  title: ?string;
  value: ?string;
  short: ?boolean;
}

class _Action {
  name: ?string;
  text: ?string;
  type: ?string;
  value: ?string;
}

class CardTemplate {

  constructor() {
    this.fields = [];
    this.actions = [];
  }

  // Required plain-text summary of the attachment.
  fallback: ?string;
  // Hexadecimal
  color: ?string;
  // Optional text that appears above the attachment block
  pretext: ?string;
  // About the author of the message
  author_name: ?string;
  author_link: ?string;
  author_icon: ?string;
  // Title of the card
  title: ?string;
  title_link: ?string;
  // Main body of the card
  // Optional text that appears within the attachment
  text: ?string;
  fields: _Field[];
  actions: _Action[];
  // Cards
  attachment_type: string;
  attachments: CardTemplate[];
  // Image of the card
  image_url: ?string;
  thumb_url: ?string;
  // Footer
  footer: ?string;
  footer_icon: ?string;
  // Extra
  callback_text: ?string;
  callback_id: ?string;

  addField(title: string, value: string, short: boolean = false): void {
    const field = new _Field();
    field.title = title;
    field.value = value;
    field.short = short;
    this.fields.push(field);
  }

  addButton(name: ?string, text: ?string, value: ?string): void {
    const button = new _Action();
    button.type = 'button';

    button.name = name;
    button.text = text;
    button.value = value;
    this.actions.push(button);
  }

  toAttachment(): any {
    const attachment: any = {
      fallback: this.fallback,
      color: this.color,
      pretext: this.pretext,
      author_name: this.author_name,
      author_link: this.author_link,
      author_icon: this.author_icon,
      title: this.title,
      title_link: this.title_link,
      text: this.text,
      attachment_type: this.attachment_type,
      attachments: this.attachments,
      image_url: this.image_url,
      thumb_url: this.thumb_url,
      footer: this.footer,
      footer_icon: this.footer_icon,
      callback_text: this.callback_text,
      callback_id: this.callback_id
    };

    if (this.actions.length > 0) {
      attachment.actions = this.actions;
    }
    if (this.fields.length > 0) {
      attachment.fields = this.fields;
    }
    return attachment;
  }

  toString(): string {
    return JSON.stringify(this.toAttachment());
  }

  toArray(): CardTemplate[] {
    return [this.toAttachment()];
  }
}

module.exports = CardTemplate;
