const db = require("../db.js");

class Admin {
  //Returns the flagged posts for the admin to see.
  static async getFlaggedPosts() {
    const results = await db.query(
      `
      SELECT * FROM user_posts
      WHERE flagged = true
      RETURNING *
      `,
    );

    return results.rows[0];
  }

  //Deletes a single post, used by admin if they deem it fit to delete post
  static async deletePost(post_id, user_id) {
    //Delete the post from the db
    const deletePost = await db.query(
      `
      DELETE FROM user_posts
      WHERE id = $1
      RETURNING *
      `,
      [post_id],
    );

    //Update strikes by 1 for user

    //Grabs strikes for user
    const strikes = await db.query(
      `
      SELECT strikes
      FROM users
      WHERE id = $1
      `,
    );
    //Update Strikes by 1
    const newStrikes = strikes + 1;
    const updateStrikes = await db.query(
      `
      UPDATE users
      SET strikes = $1,
      WHERE id = $2
      RETURNING *
      `,
      [newStrikes, user_id],
    );
    const results = {
      deletedPost: deletePost.rows[0],
      userStrikes: updateStrikes.rows[0],
    };
    return results;
  }

  //Gets all the flagged users and returns them for the admin to see.
  static async getFlaggedUsers() {
    const results = await db.query(
      `
      SELECT * FROM users
      WHERE flagged = true
      `,
    );

    return results.rows[0];
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
