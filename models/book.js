const mongoose = require("mongoose"); // for BOok model
const bookReview = require("./bookReview"); // to add a field in Book model

const Schema = mongoose.Schema;

// a new schema for Book
const bookSchema = new Schema({
    title: String, // title - string
    author: String, // author - string
    price: Number, // price - number
    about: String, // about(excerpt) of book - string
    image: String, // image - uri(string) - checked using joi
    bestPurchaseLink: String, // best site to buy book - uri(string) - checked using joi
    avgRating: Number, // average rating of the book
    //reviews - array of objectid for reviews
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'bookReview' // reference model
        }
    ]
});
//add the model to module exports
module.exports = mongoose.model("book", bookSchema);