const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt')  // ordena em ordem decrescdente

        return res.json(posts)
    },

    async store(req, res) {
        // console.log(req.file)   
        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file

        const [name] = image.split('.')
        const fileName = `${name}.jpg`

        await sharp(req.file.path)
            .resize(500)            // 500 pixels de largura ou de altura
            .jpeg({ quality: 70 })  // 70% de qualidade
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        
        fs.unlinkSync(req.file.path)    // remove imagem original

        const post = await Post.create({
            author,
            place,
            description, 
            hashtags,
            image: fileName,
        })

        req.io.emit('post', post)
        
        return res.json(post)
    }
}