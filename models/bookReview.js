const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookReviewSchema = new Schema({
    content: String,
    rating: Number,
});

module.exports = mongoose.model("bookReview",bookReviewSchema);