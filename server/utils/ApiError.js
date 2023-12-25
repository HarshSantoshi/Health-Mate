// For handling errors of api (Nodejs Error API)
//overiding the constructor
class ApiError extends Error{
    constructor(
        statusCode ,
        message  = "Error while handling apis",
        errors = [] , 
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

    }
}
export {ApiError}