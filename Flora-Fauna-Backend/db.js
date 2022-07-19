const { Client } = require("pg");
const {  getDataBaseUri } = require("./config");

const db = new Client({connectionString: getDataBaseUri() });


db.connect((err) => {
    if(err){
        console.log("error")
    }
    else{
        console.log("Successfully connected to postgres db!".blue);
    }
})

module.exports = db;