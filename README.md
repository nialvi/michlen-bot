# Telegram nodejs boilerplate

## Dev mode

```bash
npm run dev
```

## Env

You need to use file `.env.example` and create `.env`.

Use command `npm run gen-env` for generate new types for env variables.

All firebase configuration is placed in `.env`

If you add new env variables, you will need to map env variables to a config object in folder `config`.

## Stack

- nodejs
- typescript
- telegraf
- firebase
- log4js
