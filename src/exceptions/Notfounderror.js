class Notfounderror extends Error {
    constructor(message) {
        super(message)
        this.statuscode = 404
        this.message = message
    }
}

export default Notfounderror

// defining custon not found error handler