class unsupportedmediatypeerror extends Error{
    constructor(message){
        super(message)
        this.statuscode = 415
        this.message = message
    }
}
export default unsupportedmediatypeerror