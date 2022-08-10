const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const db = require("../db");
const { API_KEY, PEXEL_API_KEY } = require("../config.js");
const { json } = require("express");

class Planimal {
  //Changes each term to be begin with a capital letter
  //and adds wildcard characters for fuzzy search
  static modifyTerms(searchTerm) {
    const terms = searchTerm.data.split(" ");

    for (let i = 0; i < terms.length; i++) {
      terms[i] = terms[i][0].toUpperCase() + terms[i].substr(1);
    }

    const joinedWord = terms.join("%25");

    return "%25" + joinedWord + "%25";
  }

  //Fetches the photos from wikipedia API and displays that.
  static async getPhotoResults(searchInput) {
    const lowerCaseInput = searchInput.query.toLowerCase();
    const FirstCallUrl =
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${lowerCaseInput}&limit=5&namespace=0&format=json&redirects=resolve`;
    const SecondCallUrl =
      `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=`;
    const thirdCall =
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=${lowerCaseInput}`;

    const data = await fetch(FirstCallUrl);
    const jsonData = await data.json();
    const wikiLink = jsonData.pop();
    const paragraphData = await fetch(thirdCall);
    const paragraph = await paragraphData.json();
    // array empty or does not exist
    if (wikiLink.length <= 0) {
      return "";
    } else {
      let wikiLinkSub = wikiLink[0].substring(wikiLink[0].lastIndexOf("/") + 1);
      const secondCallData = await fetch(SecondCallUrl + wikiLinkSub);
      const secondJsonData = await secondCallData.json();
      const obj = {
        url: wikiLink,
        photo: secondJsonData.query.pages[0].original,
        description: paragraph.query.pages,
      };
      return obj;
    }
  }

  //fetches data from api and returns a json file
  //TODO - add numeric check withen search term to prevent errors
  static async getResults(searchInput) {
    //Gets data from NY database
    const GENERIC_FILTER =
      `$select=distinct common_name,scientific_name,taxonomic_group,state_conservation_rank&$where=category not in('Natural Community')`;
    const PARSED_TERMS = Planimal.modifyTerms(searchInput);
    let url =
      `https://data.ny.gov/resource/tk82-7km5.json?$$app_token=${API_KEY}&${GENERIC_FILTER} AND common_name like "${PARSED_TERMS}"`;
    const response = await fetch(url);
    const myJson = await response.json();

    //Searches internal database to see if its already in there
    const searchString = searchInput.data;
    const input = `%${searchString}%`;
    const check = await db.query(
      `
      SELECT * FROM planimals
      WHERE common_name ILIKE $1
      `,
      [input],
    );

    //Returns the array with more entries, Will also store in database if internal database entries is lower than NY database entries
    if (myJson.length > check.rows.length) {
      return myJson;
    } else {
      return { data: check.rows, exists: true };
    }
  }

  //Gets pictures for each search result, done seperatly to avoid slow search times.
  static async getPictureResults(myJson) {
    //Gets each picture for the search results animals and returns an array of them
    let arr = [];
    for (let e of myJson.query) {
      const picture = await this.getPhotoResults({
        query: e.common_name.toLowerCase(),
      });
      const tempObj = { data: e, picture: picture };
      arr.push(tempObj);
    }
    

    //Loops throught the json and inputs it in to the database
    arr.forEach(async (e) => {
      let url = "";
      if (e?.picture?.photo?.source === undefined) {
        let url = "";
      } else {
        url = e?.picture?.photo?.source;
      }
      const results = await db.query(
        `INSERT INTO planimals(
            common_name,        
            scientific_name,
            taxonomic_group,
            image_url,           
            conservation_rate   
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, common_name, scientific_name, image_url,conservation_rate 
        `,
        [
          e?.data?.common_name,
          e?.data?.scientific_name,
          e?.data?.taxonomic_group,
          url,
          e?.data?.state_conservation_rank,
        ],
      );
    });
    return arr;
  }
}

module.exports = Planimal;
