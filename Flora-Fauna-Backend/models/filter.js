const db = require("../db.js");
const { BadRequestError } = require("../utils/errors.js");

class Filter {
  //Returns all posts from the plants category in descending order based on likes.
  static async getFilteredCategory(category) {
    let outputArr = [];
    for (let e of category.data) {
      if (e != "categories") {
        const inputString = `${e}`
        const results = await db.query(
          `
        SELECT * FROM user_posts
        WHERE category = $1 
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
