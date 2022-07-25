require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secretDev"
const API_KEY =`exrEXXrEuN2u9UchWxUidMwQ5`
const PEXEL_API_KEY = `563492ad6f9170000100000144a6c1064701472484170d258be76e4a`

function getDataBaseUri(){
    const dbUser = process.env.DATABASE_USER || "postgres";
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres";
    const dbHost = process.env.DATABASE_HOST || "localhost";
    const dbPort = process.env.DATABASE_PORT || "5432";
    const dbName = process.env.DATABASE_NAME || "flora_and_fauna";

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const BCRYPT_WORK_FACTOR = 10;

console.log("Flora & Fauna config:".red)
console.log("Port: ".blue, PORT)
console.log("Database URI:".blue, getDataBaseUri())
console.log("SecretKey: ".green, SECRET_KEY)
console.log("----".gray);



module.exports = {
    PORT,
    getDataBaseUri,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    API_KEY,
    PEXEL_API_KEY
}
