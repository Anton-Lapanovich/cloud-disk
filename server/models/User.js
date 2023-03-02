const {Schema, model, ObjectId} = require("mongoose")


// When using the Mongoose library to work with MongoDB, by default, a field called _id is created in every document
const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    // An array, each object of which has the ObjectId type and refers to the file entity
    files: [{type: ObjectId, ref: 'File'}]
})

module.exports = model('User', User)