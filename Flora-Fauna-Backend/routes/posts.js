const express = require("express");
const router = express.Router();
const Posts = require("../models/posts.js");
const User = require("../models/user.js");
const security = require("../middleware/security");

//Route to create post and insert into database
router.post("/create", security.reqAuthUser, async(req,res,next) => {
  try{
    const { email } = res.locals.user;
    const user = await User.fetchUser(email);
    const makePost = await Posts.createPosts(req.body, user.id);
    res.status(200).json({ makePost })
  } 
  catch(error){
    next(error);
  }
})

//Route to grab all the posts for a user
router.get("/listPosts", security.reqAuthUser, async(req,res,next) => {
  try{
    const { email } = res.locals.user;
    const user = await User.fetchUser(email);
    const allUserPosts = await Posts.getPostsForUser(user.id);
    res.status(200).json({ allUserPosts })
  }
  catch(error){
    next(error)
  }
})

//Updates the likes for a post
router.post("/update", security.reqAuthUser, async(req,res,next) => {
  try{
    const updatedLikes = await Posts.updateLikes(req.body);
    res.status(200).json({ updatedLikes })
  }
  catch(error){
    next(error)
  }
})

module.exports = router;
