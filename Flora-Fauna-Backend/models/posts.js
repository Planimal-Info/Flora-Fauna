const db = require("../db.js");
const { BadRequestError } = require("../utils/errors");
const { unlink } = require("node:fs/promises");
const fs = require("fs");

class Posts {
  //Adds a post to the database
  static async createPosts(data, user_id) {
    const requiredFields = [
      "photo",
      "caption",
      "title",
    ];
    requiredFields.forEach((e) => {
      if (!data.hasOwnProperty(e)) {
        return new BadRequestError(`Missing ${e} in request body`);
      }
    });

    const results = await db.query(
      `INSERT INTO user_posts(
          user_post_desc,
          user_id,
          user_post_title
        )
        VALUES ($1, $2, $3)
        RETURNING id, user_post_desc, user_id, likes, user_post_title
        `,
      [
        data.values.caption,
        user_id,
        data.values.title,
      ],
    );
    return results.rows[0];
  }
  //Gets all the posts for a user
  static async getPostsForUser(user_id) {
    const results = await db.query(
      `
      SELECT * FROM user_posts WHERE user_id = $1
      `,
      [user_id],
    );
    return results.rows;
  }

  //Attach image to corresponding post in db
  static async attachImage(image, user) {
    //Get all posts from a user and use that to get the latest entry
    const getPosts = await this.getPostsForUser(user.id);
    const postId = getPosts[getPosts.length - 1];

    //Reads binary data from file and stores it.
    const data = fs.readFileSync(image.path);

    //Inputs binary data in latest posts, to match up post and image.
    const results = await db.query(
      `
      UPDATE user_posts 
      SET photo = $1
      WHERE id = $2
      RETURNING *
      `,
      [data, postId.id],
    );
   
    //Deletes file from uploads file, as to not become bloated
    fs.unlink(`${image.path}`, () => {
      //Need to improve before going into production || Alternative: Put success info into txt
      console.log("success")
    })

    //Returns all posts made
    const getPost2 = await this.getAllPosts();
    return getPost2;
  }

  //Update likes for a user posts.
  static async updateLikes(data) {
    const updatedLikes = data.likes + 1;
    const results = await db.query(
      `
      UPDATE user_posts
      SET likes = $1
      WHERE id = $2
      `,
      [updatedLikes, data.post_id],
    );
    return results.rows[0];
  }

  //Returns the post that matches the post_id
  static async getPost(post_id) {
    const results = await db.query(
      `
      SELECT * FROM user_posts
      WHERE id = $1
      `,
      [post_id],
    );
    return results.rows[0];
  }

  //List all posts
  static async getAllPosts() {
    const result = await db.query(
      `
      SELECT * FROM user_posts
      `,
    );
    return result.rows;
  }
}

module.exports = Posts;
