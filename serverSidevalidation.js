const joi = require("joi"); // package for validating the data in POST / PUT requests

// defining a schema to be checked for Book
const bookSchemaCheck = joi.object({ // all fields are required
    book: joi.object({
        title: joi.string().required().min(2).max(100), // min length - 2 , max length - 100
        author: joi.string().required().min(2).max(100), // min length - 2 , max length - 100
        image: joi.string().required().uri(), // must be a uri
        bestPurchaseLink: joi.string().required().uri(), // must be a uri
        price: joi.number().required().min(0), // min length - 0
        about: joi.string().required().min(0), // min length - 0
    }).required()
});


// defining a schema to be checked for Book-Review
const bookReviewSchemaCheck = joi.object({ // all fields are required
    review: joi.object({
        content: joi.string().required(), // string, any length
        rating: joi.number().required().min(1).max(5), // min rating - 1, max rating - 5
        username: joi.string().required() // username required
    }).required()
});

//adding the modules to module exports
module.exports.bookSchemaCheck = bookSchemaCheck;
module.exports.bookReviewSchemaCheck = bookReviewSchemaCheck;