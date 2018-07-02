# Sbotify

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![first-timers-only](http://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](http://www.firsttimersonly.com/)

A Slack app that allows you to easily share the new artists you discover, or that cool song you want your teammates to listen to!

![Sbotify logo](https://user-images.githubusercontent.com/15201480/27359886-dd78f546-55e3-11e7-8482-421750fff96b.png)


## Getting Started

For usage-only, please go to the [main website](https://a-rmz.github.io/sbotify/). There you'll find all the information you need use the app.

Now, if you want to run your own instance, this is the place to be.

### Prerequisites

#### Docker and Docker Compose
- Follow the instructions on the [Docker](https://www.docker.com/community-edition#/download) website and install the version corresponding to your OS
- Install [Docker Compose](https://docs.docker.com/compose/install/)

#### Spotify
- Go to [Spotify developer's site](https://developer.spotify.com/) and create a new app.
- Keep the tab open, you'll need the Client ID and Secret soon

#### Slack
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

#### Sticking all together
Now, going back to your environment, copy and rename the `.env.example` to `.env` and fill the required variables:

```
NODE_ENV -> current environment (development, testing, production)
LOGFILE -> name of the file that will be used to log

MYSQL_ROOT_PASSWORD -> password for the MySQL root user

DB_HOST -> host for the credentials database
DB_PORT -> port for the credentials database
DB_NAME -> name of the credentials database to be used
DB_USER -> user to access the credentials database
DB_PASS -> password for the db user

BASE_URL -> url of the website (in case you're not using authentication, you can leave it blank -but don't delete it)
PORT -> port for the app to run

SPOTIFY_CLIENT_ID -> Taken from the Spotify app you created
SPOTIFY_CLIENT_SECRET -> idem

SLACK_CLIENT_ID -> From the Slack app dashboard
SLACK_CLIENT_SECRET -> idem
SLACK_REDIRECT_URI -> OAuth redirect uri (in case you're not using authentication, you can leave it blank)

```

### Installing

First install the dependencies, you can use `npm` or `yarn`:

```
$ npm install
```
or
```
$ yarn
```

After everything is installed, run the database migrations in order to create the adequate schemas.

```
$ [yarn | npm] run migrate up
```

To run the application, first run the build:
```
$ npm run build
```
or
```
$ yarn build
```

and then run the app
```
$ docker-compose build
$ docker-compose up
```

You should see some debug dump in the console, something like this:
```
$ debug: Refreshing token
$ debug: Token refresh service running every 3600 seconds
$ debug: Mounting service Spotify
$ debug: Mounting route /slack
$ debug: Mounting route /telegram
$ debug: Sbotify server running in port 4500!
$ debug: The new token is XXXXXXX
```

## Running the tests

Run:

```
$ [npm | yarn] test
```

## Running the linter

Run:

```
$ [npm | yarn] lint
```

## Running the type checking

Run:

```
$ [npm | yarn] flow
```

## Deployment

Make sure everything is done as for development and you should be good to go. 🚀

## Built With

* [Express](https://expressjs.com) - API server and router
* [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) - Spotify API wrapper for Node
* [Winston](https://github.com/winstonjs/winston) - Multi-transport async logging library for Node
* [Flow](https://flow.org) - Type checker
* [Jest](https://facebook.github.io/jest/) - Testing framework

## Contributing

If you're interested in contributing, you're awesome! Isn't OSS great? Please read the [contribution guide](./CONTRIBUTING.md) for details on the process for submitting pull requests, it's not as hard as it sounds. 😉

## Versioning

We use [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) for versioning. Please adhere to the naming convention.

## Authors

* **Alejandro -Alex- Ramirez** - *Development* - [a-rmz](https://github.com/a-rmz)
* **Kinduff** - *Deployment/Mentoring* - [kinduff](https://github.com/kinduff)

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details

## Acknowledgments

* [PurpleBooth](https://github.com/PurpleBooth) for developing this amazing README template
* Anyone whose code was used, thanks for contributing to the the Open Source community
* Anyone who helped with the development of this project
* Most important, to you, for getting this far on the readme and showing interest in the project. You're awesome! 😄

--------
**Developed with ❤️ from 🇲🇽**
