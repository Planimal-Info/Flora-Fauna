const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const bcrypt = require("bcrypt")
const db = require("../db")
const { BCRYPT_WORK_FACTOR } = require('../config.js')

class User {
    static async makePublicUser(user){
        const publicUser = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            admin: user.is_admin 
        }
       return publicUser
    }
    //gets email from database.
    static async fetchUser(email){
        if(!email){
            throw new BadRequestError("Need Valid Email")
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0];
        return user;
    }

    static async login(credentials) {
        //submit email and password
        const loginInput = ["email", "password"]

        loginInput.forEach((element) => {
            if(!credentials.hasOwnProperty(element)){
                throw new BadRequestError(`Missing ${element} in request body`)
            }
        })

        //login logic goes here
        const user = await User.fetchUser(credentials.email)
        
        if(user){
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if(isValid){
                this.currentUser = user;
                return User.makePublicUser(user)
            }
        }

        throw new UnauthorizedError("Wrong Password")
    }

    
    static async register(credentials) {
        //submit email and password, first name, last name, and username
        const userData = credentials
        const registerFields = ["username", "password", "firstName", "lastName", "email"]
        registerFields.forEach((element) => {
            if(!userData.hasOwnProperty(element)){
                throw new BadRequestError(`Missing ${element} in request body`)
            }
        })
        const alreadyRegistered = await User.fetchUser(userData.email)
        if(alreadyRegistered) {
            throw new BadRequestError('Email has already been registered')
        }

        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!userData.email.match(mailformat)){
             throw new BadRequestError("Invalid Email")
        }
        const cleanEmail = userData.email.toLowerCase()
        const hashedPassword = await bcrypt.hash(userData.password, BCRYPT_WORK_FACTOR)
        const created_at = "2022-01-01"
        const is_admin = credentials.is_admin ? credentials.is_admin : false
    
        const result = await db.query(
            
        `INSERT INTO users(
            is_admin, 
            username,  
            first_name,
            last_name,
            email,
            password,
            created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, is_admin, username, first_name, last_name, email, password, created_at;
            `, 
                [is_admin, userData.username, userData.firstName, userData.lastName, cleanEmail, hashedPassword, created_at]
        )
        const user = result.rows[0];
        return user
    }
    
    //Gets all the liked posts for a user
    static async getLikedPosts(id){
        //Gets the post ids using the users id
        const getLikedPostIds = await db.query(
            `
            SELECT user_post_id FROM likes WHERE user_id = $1 AND liked = $2
            `,
            [id, true]
        );
        //Gets the posts from the database and stores them in an array to return.
        let postsArray = [];
        for(let e in getLikedPostIds?.rows){
                const results = await db.query(
                    `
                    SELECT * FROM user_posts
                    WHERE id = $1
                    `,
                    [getLikedPostIds?.rows[e]?.user_post_id]
                );
            if(results.rows[0] != undefined){
                postsArray.push(results.rows[0]);
            }
        } 
        
      return postsArray;  
    }

}

module.exports = User;
