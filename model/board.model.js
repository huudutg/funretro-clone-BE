const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Item = new Schema({
    content: String,
    like: Number,

});



const Board = new Schema({
    // _id: ObjectId,
    uid: String,
    name: String,
    context: String,
    Item: [[Item], [Item], [Item]],

});
module.exports = mongoose.model('board', Board)