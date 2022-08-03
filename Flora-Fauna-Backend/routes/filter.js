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
router.get("/day", async(req,res,next) => {
  try{
    res.status(200);
  }
  catch(err){
    next(err)
  }
})

//Route to get most liked posts per week
router.get("/week", async(req,res,next) => {
  try{
    res.status(200);
  }
  catch(err){
    next(err)
  }
})

//Route to get most liked posts per month
router.get("/month", async(req,res,next) => {
  try{
    res.status(200);
  }
  catch(err){
    next(err)
  }
})

module.exports = router;
