const express = require("express")
const Planimal = require("../models/planimal")
const router = express.Router()

//Search route, used to retrive data from the NY API
router.post("/search", async(req,res,next) => {
    try{
        const results = await Planimal.getResults(req.body)
        return res.status(200).json({ results })
    } catch(err){
        next(err)
    }
})

module.exports = router
