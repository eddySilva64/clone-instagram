const Post = require('../models/Post')
const jimp = require('jimp')
const path = require('path')
const fs = require('fs')

module.exports = {

    //Aqui retorna a lista dos post ja cadastrados
    async index(req, res){
        const posts = await Post.find().sort('-createdAt')

        return res.json(posts) 
    },

    //Aqui cadastras os posts no meu BD
    async store(req, res){
        const { author, place, description, hashtags} = req.body

        const { filename: image} = req.file

        const [name] = image.split('.')
        const fileName = `${name}.jpg`
        const jimp = require('jimp')
        let jimpImg = await jimp.read(req.file.path)

        jimpImg.resize(500, 500)
        .write(
        path.resolve(req.file.destination, 'resized', image)
        )

        fs.unlinkSync(req.file.path)

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