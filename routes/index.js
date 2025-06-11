import express from 'express'
import { ChatMessage } from '../models/ChatMessage.js'
export const indexRouter = express.Router()

/* GET home page. */
indexRouter.get('/', async function(req, res, next) {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 }).exec()
    res.render('index', {
      messages
    })
  } catch (err) {
    next(err)
  }
})
