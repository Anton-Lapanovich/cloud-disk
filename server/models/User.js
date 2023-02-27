const {Schema, model, ObjectId} = require("mongoose")


const User = new Schema({ // mongoose default creates id
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: ObjectId, ref: 'File'}] // an array, each object of which has the ObjectId type and refers to the file entity
})

module.exports = model('User', User)