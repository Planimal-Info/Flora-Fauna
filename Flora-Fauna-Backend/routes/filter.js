const express = require("express");
const router = express.Router();
const Filter = require("../models/filter.js"); 

//Route to get filtered for category posts
router.post("/", async(req,res,next) => {
  try{
    const data = await Filter.getFilteredCategory(req.body);
    res.status(200).json({ data })
  }
  catch(err){
    next(err);
  }
})

//Route to get most liked posts per day
router.get("/most", async(req,res,next) => {
  try{
    res.status(200);
  }
  catch(err){
    next(err)
  }
})

//Route to get most liked posts per week
router.get("/least", async(req,res,next) => {
  try{
    res.status(200);
  }
  catch(err){
    next(err)
  }
})
module.exports = router;
