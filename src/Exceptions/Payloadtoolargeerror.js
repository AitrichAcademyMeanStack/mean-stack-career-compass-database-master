class Payloadtoolargeerror extends Error{
    constructor(message){
        super(message)
        this.statuscode = 413
        this.message = message
    }
}

export default Payloadtoolargeerror