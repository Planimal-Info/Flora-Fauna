const db = require("../db.js");
const { BadRequestError } = require("../utils/errors");
const fs = require("fs");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require('../config.js');

class Profile {
  
  static async createProfile(user_id) {
    if (!user_id) {
      return new BadRequestError(`Missing user_id in request body`);
    }
    const results = await db.query(
      `INSERT INTO user_images(
          id
        )
        VALUES ($1)
        RETURNING id
        `,
      [user_id],
    );
    return results.rows[0]
  }

  //Attach image to corresponding profile in db
  static async updateProfileImage(image, user_id) {

    //Reads binary data from file and stores it.
    const data = fs.readFileSync(image.path);

    //Resize image before adding to database
    const resizedImage = await sharp(data).resize(200,200).toBuffer();

    //Inputs binary data in latest posts, to match up post and image.
    const results = await db.query(
      `
      UPDATE user_images 
      SET profile_image = $1
      WHERE id = $2
      RETURNING profile_image
      `,
      [resizedImage, user_id],
    );

    //Deletes file from uploads file, as to not become bloated
    fs.unlink(`${image.path}`, () => {
      //Need to improve before going into production || Alternative: Put success info into txt
    });

    //Returns profile image
    return results.rows[0];
  }

  //Attach image to corresponding post in db
  static async updateHeaderImage(image, user) {

   //Reads binary data from file and stores it.
   const data = fs.readFileSync(image.path);

   //Resize image before adding to database
   const resizedImage = await sharp(data).resize(700,700).toBuffer();

   //Inputs binary data in latest posts, to match up post and image.
   const results = await db.query(
     `
     UPDATE user_images 
     SET header_image = $1
     WHERE id = $2
     RETURNING header_image
     `,
     [resizedImage, user.id],
   );

   //Deletes file from uploads file, as to not become bloated
   fs.unlink(`${image.path}`, () => {
     //Need to improve before going into production || Alternative: Put success info into txt
   });

   //Returns header image
   return results.rows[0];
  }

  //Returns the post that matches the post_id
  static async getProfileImage(post_id) {
    const results = await db.query(
      `
      SELECT * FROM user_posts
      WHERE id = $1
      `,
      [profile_image],
    );
    return results.rows[0];
  }

  //Returns the post that matches the post_id
  static async getHeaderImage(post_id) {
      const results = await db.query(
        `
        SELECT * FROM user_posts
        WHERE id = $1
        `,
        [header_image],
      );
      return results.rows[0];
    }

    static async updateEmail(email, user_id) {

      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!email.match(mailformat)){
        throw new BadRequestError("Invalid Email");
      }
      const cleanEmail = email.toLowerCase();

      const results = await db.query(
        `
        UPDATE users 
        SET email = $1
        WHERE id = $2
        RETURNING email
        `,
        [cleanEmail, user_id],
      );
      return results.rows[0];
    }
    
    static async updatePassword(password, user_id) {
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

      const results = await db.query(
        `
        UPDATE users 
        SET password = $1
        WHERE id = $2
        RETURNING email
        `,
        [hashedPassword, user_id],
      );
      return results.rows[0];
    }
}

  module.exports = Profile;
