const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const User = new Schema({
    idsocial: String,
    username: String,
    password: String,
    email: String,
    joindate: Date
});
module.exports = mongoose.model('user', User)