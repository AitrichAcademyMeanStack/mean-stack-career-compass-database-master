class Badrequesterror extends Error{
    constructor(message){
        super(message)
        this.statuscode = 400
        this.message = message
    }
}

export default Badrequesterror

// defining cutsom badrequest error handler