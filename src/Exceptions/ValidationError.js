class ValidationError extends Error{
    constructor(message){
        super(message)
        this.statuscode = 403
        this.message = message
    }
}

export default ValidationError