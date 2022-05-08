const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    pages:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

const books = mongoose.model('book',bookSchema)
module.exports = books