# Acid Labs Task (Server)

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
$ heroku create

Creating app... done, ⬢ your-app-name
https://your-app-name.herokuapp.com/ | https://git.heroku.com/your-app-name.git

$ heroku git:remote -a your-app-name
```

Set the `DARKSKY_API_KEY` variable:
```bash
$ heroku config:set DARKSKY_API_KEY="your_api_key"
```

Add a new `redis` instance:
```bash
$ heroku addons:create heroku-redis:hobby-dev -a your-app-name
```

It will overwrite the `REDIS_URL` environment variable on the app.

Finally, push the repo to Heroku's remote:
```bash
$ git push heroku master
```

The websocket server should be running on https://your-app-name.herokuapp.com/

> Note that it will throw a 404 error since it's only a ws server