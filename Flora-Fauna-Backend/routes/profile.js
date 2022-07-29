const express = require("express");
const router = express.Router();
const Profile = require("../models/profile.js");
const User = require("../models/user.js");
const security = require("../middleware/security");
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })