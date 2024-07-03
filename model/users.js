const mongoose = require('mongoose')

const { Schema } = mongoose

const usersSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true        
    },
    password: {
        type: String,
        require: true
    }
}, {timestamps: true})

const Users = mongoose.model('Users', usersSchema)

module.exports = Users