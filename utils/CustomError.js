class CustomError extends Error{
    constructor(msg, code)
    {
        super();
        this.message = msg;
        this.StatusCode = code;
    }
};


module.exports = CustomError;