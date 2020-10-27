const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Item = new Schema({
    contain: String,
    like: Number,

});

const Board = new Schema({
    // _id: ObjectId,
    uid: String,
    name: String,
    context: String,
    actionItems: [Item],
    toImprove: [Item],
    wentWell: [Item],
});
module.exports = mongoose.model('board', Board)