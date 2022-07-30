const express = require("express");
const router = express.Router();
const security = require("../middleware/security.js");
const Admin = require("../models/admin.js");
const User = require("../models/user.js");


//Route that returns all the flagged posts
router.get("/posts", async (req, res, next) => {
  try {
    const flaggedPosts = await Admin.getFlaggedPosts();
    res.status(200).json({ flaggedPosts });
  } catch (err) {
    next(err);
  }
});

//Route that deletes the flagged posts
//Takes in a post_id
router.post("/deletePost", async(req,res,next) => {
  try{
    const deletePost = await Admin.deletePost(req.body);
    res.status(200).json({ deletePost })
  }
  catch(err){
   next(err)
  }
})

//Route that returns all the flagged users.
router.get("/users", async(req, res, next) => {
  try{
    const flaggedUsers = await Admin.getFlaggedUsers();
    res.status(200).json({ flaggedUsers })
  }
  catch(err){
    next(err);
  }
})

//Route that delete users from the database,
//Takes in a user_id
router.post("/deleteUser", async(req,res,next) => {
  try{
    const deleteUser = await Admin.deleteUser(req.body);
    res.status(200).json({ deleteUser })
  }
  catch(err){
    next(err)
  }
})

//Flags a post when called
router.post("/flagpost", async(req,res,next) => {
  try {
    const updatedPosts = await Admin.reportPost(req.body.id);
    const allPosts = await Admin.getFlaggedPosts();
    res.status(200).json({ allPosts })
  }
  catch(err){
    next(err);
  }
})

module.exports = router
