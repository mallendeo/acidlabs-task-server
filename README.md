# Acid Labs Task (Server)

### Requirements

- Docker
- Node 11
- Heroku CLI

### Clone & Install

```bash
$ git clone https://github.com/mallendeo/acidlabs-task-server
$ cd acidlabs-task-server
$ yarn
```

### Run

Start a local redis instance
```bash
$ docker run --name acid-redis -p 6379:6379 -d redis
```

Copy the dotenv file example (for development only)
```bash
$ cp .env.example .env

DARKSKY_API_KEY="YOUR_DARKSKY_API_KEY"

# If empty, it defaults to localhost:6379
REDIS_URL="redis://h:pass@host:port"
```

Run the server
```bash
$ yarn dev
```

### Build

Transpile with Babel
```bash
$ yarn build
$ NODE_ENV="production" yarn start
```

## Heroku

Login to Heroku:

```bash
$ heroku login
```

Create a new app, then add a git remote using:

```bash
APP_NAME=acidlabs-api-test

$ heroku create $APP_NAME

Creating app... done, ⬢ acidlabs-api-test
https://acidlabs-api-test.herokuapp.com/ | https://git.heroku.com/acidlabs-api-test.git

$ heroku git:remote -a $APP_NAME
```

Set the `DARKSKY_API_KEY` variable:
```bash
$ heroku config:set DARKSKY_API_KEY="your_api_key"
```

Add a new `redis` instance:
```bash
$ heroku addons:create heroku-redis:hobby-dev -a $APP_NAME
```

It will automatically overwrite the `REDIS_URL` environment variable.

Finally, push the repo to Heroku's remote:
```bash
$ git push heroku master
```

The websocket server should be running on https://acidlabs-api-test.herokuapp.com/

> Note that it will throw a 404 error since it's only a ws server
