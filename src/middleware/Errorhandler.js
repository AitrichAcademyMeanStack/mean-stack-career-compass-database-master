const errorhandler = (error,req,res,next)=>{
    const status = error.statuscode || 500
    const message = error.message   
    res.status (status).json({message:message,status:status})
}

export {errorhandler}
// defining global error handler
