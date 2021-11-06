const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookReviewSchema = new Schema({
    content: String,
    rating: Number,
    username: String
});

module.exports = mongoose.model("bookReview",bookReviewSchema);