const express = require("express");
const router = express.Router();
const Posts = require("../models/posts.js");
const User = require("../models/user.js");
const security = require("../middleware/security");
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

//Route to create post and insert into database
router.post("/create", security.reqAuthUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUser(email);
    const makePost = await Posts.createPosts(req.body, user.id);
    res.status(200).json({ post: makePost })
  } catch (error) {
    next(error);
  }
});

//Route that takes in the image file, uses multer middlware to parse and adds to uploads file.
//Also uses a post id header that was attach on request to link with post
router.post("/upload", upload.single(`file`), async (req, res, next) => {
  try {
    const { headers } = req;
    const addImage = await Posts.attachImage(req.file, headers.postid)
    res.status(200).json({ addImage });
    
  } catch (error) {
    next(error);
  }
});

//Route to grab all the posts for a user
router.get("/listPosts", security.reqAuthUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUser(email);
    const allUserPosts = await Posts.getPostsForUser(user.id);
    res.status(200).json({ allUserPosts });
  } catch (error) {
    next(error);
  }
});

//Route that returns all posts made.
router.get("/all", async(req,res,next) => {
  try{
    const allPosts = await Posts.getAllPosts();
    res.status(200).json({ allPosts })
  }
  catch(err){
    next(err);
  }
})

//Gets Initial Posts
router.get("/initial", async(req,res,next) => {
  try{
    const initialPosts = await Posts.getInitialPosts();
    res.status(200).json({ initialPosts })
  }
  catch(err){
    next(err);
  }
})

//Update likes by 1
router.post("/update", security.reqAuthUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUser(email);
    const updatedLikes = await Posts.updateLikes(req.body, user);
    res.status(200).json({ updatedLikes });
  } catch (error) {
    next(error);
  }
});

//Returns with 3 more posts if request is sent
router.post("/more", security.reqAuthUser, async(req,res,next) => {
  try{
    const getMore = await Posts.getMorePosts(req.body);
    res.status(200).json({ getMore })
  }
  catch(err){
    next(err)
  }
})

//Returns the most liked pictures in ascending order
router.get("/mostLikes", async(req,res,next) => {
  try{
    const sortedPosts = await Posts.getMostLiked();
    res.status(200).json({ sortedPosts })
  }
  catch(err){
    next(err);
  }
})

//Returns the post from the post id
router.get("/:productId", async(req,res,next) => {
  try{
    const id = req.params.productId;
    const post = await Posts.getPost(id);
    res.status(200).json({ post });
  }
  catch(err){
    next(err)
  }
})

//Gets the related posts for a user
router.post("/related", async(req,res,next) => {
  try{
    const relatedPosts = await Posts.getRelatedPosts(req.body);
    res.status(200).json({ relatedPosts })
  }
  catch(err){
    next(err)
  }
})

module.exports = router;
