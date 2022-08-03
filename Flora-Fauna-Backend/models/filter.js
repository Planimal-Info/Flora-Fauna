const db = require("../db.js");
const { BadRequestError } = require("../utils/errors.js");

class Filter {
  //Returns all posts from the plants category in descending order based on likes.
  static async getFilteredCategory(category) {
    let outputArr = [];
    for (let e of category.data.category) {
      if (e != "categories" && category.data.time.anchorKey === "Most Liked") {
        const inputString = `${e}`;
        const results = await db.query(
          `
        SELECT * FROM user_posts
        WHERE category = $1
        ORDER BY likes DESC
        `,
          [inputString],
        );
        outputArr.push(results.rows);
      } else {
        const inputString = `${e}`;
        const results = await db.query(
          `
        SELECT * FROM user_posts
        WHERE category = $1
        ORDER BY likes ASC
        `,
          [inputString],
        );
        outputArr.push(results.rows);
      }
    }
    return outputArr;
  }

  //Returns most like posts per day.
  static async postsPerDay() {
  }

  //Returns most liked posts per week
  static async postsPerWeek() {
  }

  //Returns most liked posts per month
  static async postsPerMonth() {
  }
}

module.exports = Filter;
