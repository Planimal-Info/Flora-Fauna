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

//Route that returns pictures of request
router.post("/search/getPhotos", async(req,res,next) => {
    try{
        const results = await Planimal.getPhotoResults(req.body);
        return res.status(200).json({ results })
    }
    catch(err){
        next(err)    
    }
}) 

//Returns the picture results
router.post("/getPictures", async(req,res,next) => {
    try{
        const pictureResults = await Planimal.getPictureResults(req.body);
        return res.status(200).json({ pictureResults });
    }
    catch(err){
        next(err)
    }
})

module.exports = router
