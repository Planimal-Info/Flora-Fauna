const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./utils/errors");
const router = require("./routes/auth.js")
const planimalRouter = require("./routes/planimal.js")
const security = require("./middleware/security.js")


const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(security.getUser);

app.use("/auth", router)
app.use("/planimal", planimalRouter)

app.get("/", async (req,res,next) => {
    console.log(res);
    try {
        res.status(200).json({
            "ping":"pong"
        })
    }
    catch(err){
        next(err);
    }
})

app.use((req,res,next) => {
    return next(new NotFoundError());
})

app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error : {message, status}
    })
})


module.exports = app;
