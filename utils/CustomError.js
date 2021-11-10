// A class for defining our custom error
class CustomError extends Error{
    constructor(msg, code)
    {
        super(); // construct parent Error class
        this.message = msg; // add a message
        this.StatusCode = code; // add a error code
    }
};

//add the class to module exports
module.exports = CustomError;