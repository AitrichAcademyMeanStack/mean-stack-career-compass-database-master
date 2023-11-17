class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.statuscode = 400
        this.message = message
    }
}

export default BadRequestError

// defining cutsom badrequest error handler