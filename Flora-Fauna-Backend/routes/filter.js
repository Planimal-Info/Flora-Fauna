const express = require("express");
const router = express.Router();

//Route to get mammal posts
router.get("/mammals", async(req,res,next) => {
  try{

  }
  catch(err){
    next(err);
  }
})

//Route to get plants posts
router.get("/plants", async(req,res,next) => {
  try{

  }
  catch(err){
    next(err);
  }
})

//Route to get reptile posts
router.get("/reptiles", async(req,res,next) => {
  try{

  }
  catch(err){
    next(err);
  }
})

//Route to get insects posts
router.get("/insects", async(req,res,next) => {
  try{

  }
  catch(err){
    next(err)
  }
})

//Route to get most liked posts per day
router.get("/day", async(req,res,next) => {
  try{

  }
  catch(err){
    next(err)
  }
})

//Route to get most liked posts per week
router.get("/week", async(req,res,next) => {
  try{

  }
  catch(err){
    next(err)
  }
})

//Route to get most liked posts per month
router.get("/month", async(req,res,next) => {
  try{

  }
  catch(err){
    next(err)
  }
})
