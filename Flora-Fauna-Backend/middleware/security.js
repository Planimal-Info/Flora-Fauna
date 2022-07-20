const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")

//Extract headers from the req and is used to filter and grab token
const jwtExtract = ({ headers }) => {
    if(headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if(scheme.trim() === "Bearer") {
            return token
        }
    }

    return undefined
}

//Grabs the request from the middleware chain and parses to get token and places it in res.locals.
const getUser = (req,res,next) => {
    try {
        const token = jwtExtract(req)
        if(token) {
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }
        return next();
    }
    catch(err){
        return next();
    }
}

//Check to see if there is a authenticated user.
const reqAuthUser = (req,res,next) => {
    try {
        const { user } = res.locals
        if(!user.email){
            throw new UnauthorizedError()
        }
        return next();
    }
    catch(err){
        return next(err);
    }
}


module.exports = {
    jwtExtract, 
    getUser,
    reqAuthUser
}
