const db = require("../db.js");
const { BadRequestError } = require("../utils/errors");

class Posts {
  //Adds a post to the database
  static async createPosts(data, user_id) {
    const requiredFields = [
      "photo",
      "user_post_desc",
      "taxonomy",
      "likes",
      "user_posts_title",
    ];
    requiredFields.forEach((e) => {
      if (!data.hasOwnProperty(e)) {
        return new BadRequestError(`Missing ${e} in request body`);
      }
    });

    const results = await db.query(
      `INSERT INTO user_posts(
          photo,
          user_post_desc,
          taxonomy,
          user_id,
          likes, 
          user_post_title
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, photo, user_post_desc, taxonomy, user_id, likes, likes, user_post_title
        `,
      [
        data.photo,
        data.user_post_desc,
        data.taxonomy,
        user_id,
        data.likes,
        data.user_post_title,
      ],
    );

    const post = results.rows[0];
    return post;
  }
  //Gets all the posts for a user
  static async getPostsForUser(user_id) {
    const results = await db.query(
      `
      SELECT * FROM user_posts
      WHERE user_id = $1
      `,
      [user_id],
    );
    return results.rows[0];
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
}

module.exports = Posts;
