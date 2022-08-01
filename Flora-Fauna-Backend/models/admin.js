const db = require("../db.js");

class Admin {
  //Returns the flagged posts for the admin to see.
  static async getFlaggedPosts() {
    const results = await db.query(
      `
      SELECT id, user_post_title, user_post_desc, user_id 
      FROM user_posts
      WHERE flagged = true
      `,
    );
    return results.rows;
  }
  //Deletes a single post, used by admin if they deem it fit to delete post
  static async deletePost(data) {
    //Delete the post from the db
    const deletePost = await db.query(
      `
      DELETE FROM user_posts
      WHERE id = $1
      RETURNING *
      `,
      [data.data.postId],
    );
    //Grabs strikes for user
    const strikes = await db.query(
      `
      SELECT strikes
      FROM users
      WHERE id = $1
      `,
      [data.data.userId],
    );
    let updatedUser = {};
    if (strikes.rows[0].strikes >= 3) {
      const updateFlagged = await db.query(
        `
        UPDATE users
        SET flagged = true
        WHERE id = $1
        RETURNING *
        `,
        [data.data.userId],
      );
      updatedUser = updateFlagged;
    }
    //Update Strikes by 1
    const newStrikes = strikes.rows[0].strikes + 1;
    const updateStrikes = await db.query(
      `
      UPDATE users
      SET strikes = $1 
      WHERE id = $2
      RETURNING *
      `,
      [newStrikes, data.data.userId],
    );

    const results = {
      deletedPost: deletePost.rows[0],
      userStrikes: updateStrikes.rows[0],
      flagged: updatedUser,
    };
    return results;
  }

  //Updates flagged for a post when true
  static async reportPost(post_id) {
    const results = await db.query(
      `
      UPDATE user_posts
      SET flagged = true
      WHERE id = $1
      RETURNING *
      `,
      [post_id],
    );

    return results.rows;
  }

  //Gets all the flagged users and returns them for the admin to see.
  static async getFlaggedUsers() {
    const results = await db.query(
      `
      SELECT * FROM users
      WHERE flagged = true OR strikes >= 3
      `,
    );
    return results.rows;
  }

  //Deletes user account from database, Admin can use this to delete the account of repeat offenders.
  static async deleteAccount(user_id) {
    const results = await db.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
      `,
      [user_id],
    );

    return results.rows[0];
  }
}

module.exports = Admin;
