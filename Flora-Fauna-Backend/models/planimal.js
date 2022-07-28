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

    const FirstCallUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchInput.data}&limit=5&namespace=0&format=json&redirects=resolve`;
    const SecondCallUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=`;

    const data = await fetch(FirstCallUrl);
    const jsonData = await data.json();

    const wikiLink = jsonData.pop();
    // array empty or does not exist
    if (wikiLink.length == 0) {
      return "";
    }
    else {
      
      let wikiLinkSub = wikiLink[0].substring(wikiLink[0].lastIndexOf("/")+1);
      const secondCallData = await fetch(SecondCallUrl+wikiLinkSub);
      const secondJsonData = await secondCallData.json();

      return secondJsonData.query.pages[0].original.source;
    }
  }

  //fetches data from api and returns a json file
  //TODO - add numeric check withen search term to prevent errors
  static async getResults(searchInput) {
    const GENERIC_FILTER =
      `$select=distinct common_name,scientific_name,taxonomic_group,state_conservation_rank&$where=category not in('Natural Community')`;
    const PARSED_TERMS = Planimal.modifyTerms(searchInput);

    let url =
      `https://data.ny.gov/resource/tk82-7km5.json?$$app_token=${API_KEY}&${GENERIC_FILTER} AND common_name like "${PARSED_TERMS}"`;
    const response = await fetch(url);
    const myJson = await response.json();

    return myJson;
  }
}

module.exports = Planimal;
