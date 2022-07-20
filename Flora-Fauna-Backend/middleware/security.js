const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")

const jwtExtract = ({ headers }) => {
    if(headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if(scheme.trim() === "Bearer") {
            return token
        }
    }

    return undefined
}


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
