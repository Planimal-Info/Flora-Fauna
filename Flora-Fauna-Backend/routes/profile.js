const express = require("express");
const router = express.Router();
const Profile = require("../models/profile.js");
const User = require("../models/user.js");
const security = require("../middleware/security");
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

  //Route that takes in the image file, uses multer middlware to parse and adds to uploads file.
  router.post("/updateHeaderImage", upload.single(`file`), security.reqAuthUser, async (req, res, next) => {
    try {
      const { email } = res.locals.user;
      const user = await User.fetchUser(email);
      const addImage = await Profile.updateProfileImage(req.file, user.id)
      res.status(200).json({ addImage });
      
    } catch (error) {
      next(error);
    }
  });
  
  //Route that takes in the image file, uses multer middlware to parse and adds to uploads file.
  router.post("/uploadProfile", upload.single(`file`), security.reqAuthUser, async (req, res, next) => {
    try {
      const { email } = res.locals.user;
      const user = await User.fetchUser(email);
      const addImage = await Profile.updateProfileImage(req.file, user.id)
      res.status(200).json({ addImage });
      
    } catch (error) {
      next(error);
    }
  });
    
  //Route that takes in new email and updates.
  router.post("/updateEmail", security.reqAuthUser, async (req, res, next) => {
    try {
      const { email } = res.locals.user;
      const user = await User.fetchUser(email);
      const addEmail = await Profile.updateEmail(req.body.email, user.id)
      res.status(200).json({ addEmail });
      
    } catch (error) {
      next(error);
    }
  });

    //Route that takes in new email and updates.
    router.post("/updatePassword", security.reqAuthUser, async (req, res, next) => {
      try {
        const { email } = res.locals.user;
        const user = await User.fetchUser(email);
        const addPass = await Profile.updatePassword(req.body.password, user.id)
        res.status(200).json({ addPass });
        
      } catch (error) {
        next(error);
      }
    });

module.exports = router