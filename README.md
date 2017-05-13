# Sbotify

A Slack app that allows you to easily share the new artists you discover, or that cool song you want your teammates to listen to!

## How to use it?
[More details to be added sometime in the future]

### Spotify
- Go to [Spotify developer's site](https://developer.spotify.com/) and create a new app.
- Keep the tab open, you'll need the Client ID and Secret soon

### Slack
Assuming that you already have a Slack app ready for this:
- Create a Slash command `/spotify` (or however you wanna call it) that redirects you to
  - `https://youraddress.com/incoming`
- Create an Interactive Message integration that redirects you to 
  - `https://youraddress.com/postback`
  - That is used for the buttons that will share the content
- Activate the bot user
  - *Pro tip:* Use a cool name 😎
  - The bot will be in charge of sending the music across the team

### Setup
Now, going back to your environment:
- Copy and rename the `.env.example` to `.env` and fill the required variables
  - *Client Secret* and *Client Id* from Spotify
  - *OAuth Access Token* from the Slack app

Almost there. Now you have to install all the dependencies. Depending on your package manager you can either `npm install` or `yarn`.

## Running it
`node src/app.js`

--------
Developed with <3
