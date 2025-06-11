import session from 'express-session'
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'
// alternativa a partir de Node 22: node --env-file .env server.js

dotenv.config()

const INACTIVITY_EXPIRATION_2_DAYS = 2 * 24 * 60 * 60 * 1000

export const sessionMiddleware = session({
    name: 'nodepop-session',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
  })

  export function useSessionInViews(req, res, next) {
    res.locals.session = req.session
    next()
  }