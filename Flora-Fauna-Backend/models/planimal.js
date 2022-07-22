const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const db = require("../db")

class Planimal {

    //Changes each term to be begin with a capital letter 
    //and adds wildcard characters for fuzzy search
    static modifyTerms(searchTerm) {
        const terms = searchTerm.data.split(" ")

        for (let i = 0; i < terms.length; i++) {
            terms[i] = terms[i][0].toUpperCase() + terms[i].substr(1);
        }        
        
        terms.join("%25")

        return "%25"+terms+"%25"
    }

    //fetches data from api and returns a json file
    //TODO - add numeric check withen search term to prevent errors
    static async getResults(searchInput) {
        const API_TOKEN=`exrEXXrEuN2u9UchWxUidMwQ5`
        const GENERIC_FILTER=`$select=distinct common_name,scientific_name,taxonomic_group,state_conservation_rank&$where=category not in('Natural Community')`
        const PARSED_TERMS = Planimal.modifyTerms(searchInput)
        
        let url = `https://data.ny.gov/resource/tk82-7km5.json?$$app_token=${API_TOKEN}&${GENERIC_FILTER} AND common_name like "${PARSED_TERMS}"`
        const response = await fetch(url)
        const myJson = await response.json()
        console.log(myJson)

        return myJson
    }

}

module.exports = Planimal
