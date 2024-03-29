const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const { NotFoundError } = require("./utils/errors")
const router = require("./routes/auth.js")
const planimalRouter = require("./routes/planimal.js")
const profileRouter = require("./routes/profile.js")
const adminRouter = require("./routes/admin.js")
const postRouter = require("./routes/posts.js")
const filterRouter = require("./routes/filter.js")
const security = require("./middleware/security.js")

const app = express()

//Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(security.getUser)

//Routes
app.use("/auth", router)
app.use("/planimal", planimalRouter)
app.use("/profile", profileRouter)
app.use("/admin", adminRouter)
app.use("/post", postRouter)
app.use("/filter", filterRouter)

app.get("/", async (req,res,next) => {
    try {
        res.status(200).json({
            "ping":"pong"
        })
    }
    catch(err){
        next(err);
    }
})


//Error Handling
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
