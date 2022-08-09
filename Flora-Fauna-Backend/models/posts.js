const db = require("../db.js");
const { BadRequestError } = require("../utils/errors");
const { unlink } = require("node:fs/promises");
const fs = require("fs");
const sharp = require("sharp");
const Fuse = require("fuse.js");

class Posts {
  //Adds a post to the database
  static async createPosts(data, user_id) {
    const requiredFields = [
      "title",
      "caption",
      "category",
      "animal_name",
    ];
    requiredFields.forEach((e) => {
      if (!data.hasOwnProperty(e)) {
        return new BadRequestError(`Missing ${e} in request body`);
      }
    });

    //Validation
    const keys = Object.keys(data.values);
    keys.forEach((e) => {
      if (data.values[e].length <= 1) {
        return new BadRequestError(`Invalid input for ${e}`);
      }
    });

    const category = data.values.category.toLowerCase();
    const results = await db.query(
      `INSERT INTO user_posts(
          user_post_desc,
          user_id,
          user_post_title,
          category,
          animal_name
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, user_post_desc, user_id, likes, user_post_title, category, animal_name
        `,
      [
        data.values.caption,
        user_id,
        data.values.title,
        category,
        data.values.animal_name,
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
  static async attachImage(image, post_id) {
    //Reads binary data from file and stores it.
    const data = fs.readFileSync(image.path);

    //Resize image before adding to database
    const resizedImage = await sharp(data).resize(500, 600).toBuffer();

    //Inputs binary data in latest posts, to match up post and image.
    const results = await db.query(
      `
      UPDATE user_posts 
      SET photo = $1
      WHERE id = $2
      RETURNING *
      `,
      [resizedImage, post_id],
    );

    //Deletes file from uploads file, as to not become bloated
    fs.unlink(`${image.path}`, () => {
      //Need to improve before going into production || Alternative: Put success info into txt
      console.log("success");
    });

    //Returns all posts made
    return results.rows[0];
  }

  //Update likes for a user posts.
  static async updateLikes(data, user) {
    //Checks if the user has liked the post before
    const check = await db.query(
      `
      SELECT * FROM likes
      WHERE user_post_id = $1 AND user_id = $2
      `,
      [data.id, user.id],
    );
    //If user hasnt liked the post before, update.
    if (check.rows.length <= 0) {
      const updatedLikes = data.likes + 1;
      const results = await db.query(
        `
      UPDATE user_posts
      SET likes = $1
      WHERE id = $2
      RETURNING *
      `,
        [updatedLikes, data.id],
      );
      //Add the user to the liked table
      const addUserToLiked = await db.query(
        `
        INSERT into likes(
          user_id,
          user_post_id
        )
        VALUES($1, $2)
        RETURNING *
        `,
        [user.id, data.id],
      );
      //Return the data that the user has liked the picture now.
      return results.rows[0];
    }
    //Return the data that the user has already liked the picture
    return check.rows[0];
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

  //Gets the 5 posts from the database.
  //Gets sent on page login/refresh
  static async getInitialPosts() {
    const result = await db.query(
      `
      SELECT * FROM user_posts
      ORDER BY created_at ASC
      LIMIT 5
      `,
    );

    return result.rows;
  }

  //Gets more posts when called, does so in increments of 2
  static async getMorePosts(post_id) {
    //If the post id is less than 5, there are no more posts to grab
    if (post_id.id < 5) {
      return [];
    }

    //Gets the the first 50 id that are greater than the given ID.
    const allId = await db.query(
      `
      SELECT id FROM user_posts
      WHERE id > $1
      LIMIT 50
      `,
      [post_id.id],
    );

    //If Nothing is returned then there are no most posts
    if (allId.rows.length === 0) {
      return [];
    }

    //Variable used to loop through and get the posts, done in either increments of 3 or
    //less than that if the results returned are less than 3
    let nextPostLength = 0;
    if (allId.rows.length >= 3) {
      nextPostLength = 3;
    } else {
      nextPostLength = allId.rows.length;
    }
    //Gets the posts and adds them to this array, which we will output
    let morePosts = [];
    for (let i = 0; i < nextPostLength; i++) {
      const result = await db.query(
        `
        SELECT * FROM user_posts
        WHERE id = $1
        `,
        [allId.rows[i].id],
      );
      morePosts.push(result.rows[0]);
    }

    return morePosts;
  }
  //Gets the most likes orders in descending order
  static async getMostLiked() {
    const result = await db.query(
      `
      SELECT * FROM user_posts
      ORDER BY likes DESC
      `,
    );
    return result.rows;
  }

  //Gets posts in order by least liked
  static async getLeastLiked() {
    const result = await db.query(
      `
      SELECT * FROM user_posts
      ORDER BY likes ASC
      `,
    );
    return result.rows;
  }

  //Gets related posts for the given input
  static async getRelatedPosts(input) {
    const inputString = `${input?.name?.toLowerCase()}`;
    const groupString = `${input?.group?.toLowerCase()}`;

    //Options for fuzzy search
    const options = {
      isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      findAllMatches: true,
      minMatchCharLength: 2,
      // location: 0,
      threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      keys: [
        "animal_name",
        "category",
      ],
    };

    //Getting from posts to search
    const result1 = await db.query(
      `
      SELECT animal_name, id, category FROM user_posts
      `,
    );
    //Constructor for fuzzy search dependecy and calling to get related posts id
    const fuzzy = new Fuse(result1.rows, options);
    const relatedPosts = fuzzy.search(inputString);

    //Getting the first 5 entries from the related posts fuzzy search
    const limitPosts = relatedPosts.slice(0, 5);
    //Related posts holding array
    let tempArr = [];
    //Fuzzy searching for related animal_names in the database and getting the posts
    for (const e in limitPosts) {
      const req = async () => {
        const results = await db.query(
          `
          SELECT * FROM user_posts
          WHERE id = $1
          `,
          [relatedPosts[e].item.id],
        );
        tempArr.push(results.rows[0]);
      };
      await req();
    }

    return tempArr;
  }
}

module.exports = Posts;
