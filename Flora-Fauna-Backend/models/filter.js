const db = require("../db.js");
const { BadRequestError } = require("../utils/errors.js");

class Filter {
  //Returns all posts from the plants category in descending order based on likes.
  static async getPlantsCategory() {
  }

  //Returns all posts from the mammals category in descending order based on likes.
  static async getMammalsCategory() {
  }

  //Returns all posts from the insects category in descending order based on likes
  static async getInsectsCategory() {
  }

  //Returns all posts from the reptiles category in descending order based on likes
  static async getReptilesCategory() {
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
