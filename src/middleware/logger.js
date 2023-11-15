import {createLogger , format , transports} from "winston";

export default createLogger({

    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Including timestamps for the entry
        format.colorize(), // Applying colorize to log entries
        format.printf((info) => {
            const {timestamp , level , message , ...args} = info;
            const formattedArgs = Object.keys(args).length
            ? JSON.stringify(args , null , 2)
            : "";
            return `${timestamp} ${level} ${message} ${formattedArgs}`
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "data/log/error.log", level: "error" }), // Log error-level entries to a file
        new transports.File({ filename: "data/log/combined.log" }), // Log other log levels to a different file
    ],
})
