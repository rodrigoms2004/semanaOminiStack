const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const routes = new express.Router()
const upload = multer(uploadConfig)

routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

// http://localhost:3333/posts/5d002bc6cbfa5634e3f77c0c/like
routes.post('/posts/:id/like', LikeController.store)

// routes.get('/', (req, res) => {
//     return res.send(`Hello ${req.query.name}`)
// })

module.exports = routes