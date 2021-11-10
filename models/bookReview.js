const mongoose = require("mongoose"); // for defining Review schema
const Schema = mongoose.Schema;

// a schema for Book Review
const bookReviewSchema = new Schema({
    content: String, // review content - string
    rating: Number, // review rating - number
    username: String // username - string
});

//add model to exports
module.exports = mongoose.model("bookReview",bookReviewSchema);