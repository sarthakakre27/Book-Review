const joi = require("joi");

const bookSchemaCheck = joi.object({
    book: joi.object({
        title: joi.string().required().min(2).max(100),
        author: joi.string().required().min(2).max(100),
        image: joi.string().required().uri(),
        bestPurchaseLink: joi.string().required().uri(),
        price: joi.number().required().min(0),
        about: joi.string().required().min(0),


    }).required()
});

const bookReviewSchemaCheck = joi.object({
    review: joi.object({
        content: joi.string().required(),
        rating: joi.number().required().min(0).max(5)
    }).required()
});


module.exports.bookSchemaCheck = bookSchemaCheck;
module.exports.bookReviewSchemaCheck = bookReviewSchemaCheck;