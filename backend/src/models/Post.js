const mongoose = require('mongoose')

/**
 * Configuração das tabelas do meu BD
 */
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,

    }
}, {
    //Armazena os registro 
    timestamps: true,
})

module.exports = mongoose.model('Post', PostSchema)