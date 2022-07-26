const db = require("../db.js");


class Admin {
  //Returns the flagged posts for the admin to see.  
  static async getFlaggedPosts(){
    
    const results = db.query(
      `
      SELECT * FROM user_posts
      WHERE flagged = true
      RETURNING *
      `
    )

    return results.rows[0];
  }

  //Deletes a single post, used by admin if they deem it fit to delete post
  static async deletePost(post_id){

    const results = db.query(
      `
      DELETE FROM user_posts
      WHERE id = $1
      RETURNING *
      `,
      [post_id]
    )
    return results.rows[0];
  }

  //Gets all the flagged users and returns them for the admin to see.
  static async getFlaggedUsers(){

    const results = db.query(
      `
      SELECT * FROM users
      WHERE flagged = true
      `
    )

    return results.rows[0];
  }
  
  //Deletes user account from database, Admin can use this to delete the account of repeat offenders.
  static async deleteAccount(user_id){

    const results = db.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
      `,
      [user_id]
    )

    return results.rows[0];
  }

}

module.exports = Admin;
