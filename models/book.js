const mongoose = require("mongoose");
const bookReview = require("./bookReview");

const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: String,
    author: String,
    price: Number,
    about: String,
    image: String,
    bestPurchaseLink: String,
    avgRating: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'bookReview'
        }
    ]
});

module.exports = mongoose.model("book", bookSchema);