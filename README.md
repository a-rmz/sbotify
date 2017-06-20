# Sbotify

A Slack app that allows you to easily share the new artists you discover, or that cool song you want your teammates to listen to!

## How to use it?
For usage-only, please go to the [main website](https://a-rmz.github.io/sbotify/). There you'll find all the information you need use the app.

Now, if you want to run your own instance, this is the place to be.

## Setup
### Spotify
- Go to [Spotify developer's site](https://developer.spotify.com/) and create a new app.
- Keep the tab open, you'll need the Client ID and Secret soon

### Slack
- Go to [Slack apps](https://api.slack.com/apps) and create a new one.
- Create a [Slash command](https://api.slack.com/slash-commands) `/sbotify` (or however you wanna call it) that redirects you to
  - `https://youraddress.com/slack/incoming`
- Create an [Interactive Message](https://api.slack.com/interactive-messages) integration that points to
  - `https://youraddress.com/slack/postback`
  - That is used for the buttons that will share the content
- Activate the [bot user](https://api.slack.com/bot-users)
  - *Pro tip:* Use a cool bot name 😎
  - The bot will be in charge of sending the music across the team
  - Go to OAuth & Permissions and add the `chat:write:bot` permission

[Optional]
- In case you want to use OAuth
  - Go to OAuth & Permissions and add a new Redirect URL redirects to
  - `https://youraddress.com/slack/auth`

**NOTE:** All the URLs you provide for your app must be secure (`https`).

### Sticking all together
Now, going back to your environment:
- Copy and rename the `.env.example` to `.env` and fill the required variables
  - *Client Secret*, *Client Id*, and *Redirect URI* from Spotify
  - *OAuth Access Token* from the Slack app

The REDIRECT_URI will be used only in case you want to use OAuth, otherwise, you can leave it empty.

Almost there. Now you have to install all the dependencies. Depending on your package manager you can either `npm install` or `yarn`.

Run the database migrations in order to create the adequate schemas.

```[ yarn | npm ] run migrate up```

## Build and run the app
```[ yarn | npm ] run build```
```[ yarn | npm ] start```

--------
Developed with <3
