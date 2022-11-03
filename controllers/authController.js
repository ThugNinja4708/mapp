const pool = require('../config/db');
//const queries= require('../config/queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const handleLogin = async(req,res)=>{
        const body = req.body;

        console.log("login",body);

        let foundUser = {}
        if(!body.userEmail || !body.userPassword) return res.status(400).send({'messgae':"Email and password are required"});
        try {
            const selectQuery = `SELECT * FROM "mapSchema".users WHERE user_email = '${body.userEmail}' LIMIT 1;` // change if not working LOL..
            foundUser =  (await pool.query(selectQuery));

          } catch (error) {
            console.error(error.message);
          }
    
    // if(!foundUser) return res.sendStatus(401);
        if(foundUser.rowCount == 0) return res.sendStatus(401);
        //console.log(foundUser);
    const match = await bcrypt.compare(body.userPassword,foundUser.rows[0].user_password);
    //console.log("reached here");
    if(match){
        const role = foundUser.rows[0].user_role;
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                "username": foundUser.rows[0].user_name,
                "roles": role,
                "userId":foundUser.rows[0].user_id
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            {"userId": foundUser.rows[0].user_id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d' }
        );
        const loginQuery = `UPDATE "mapSchema".users SET refresh_token='${refreshToken}' where user_id='${foundUser.rows[0].user_id}'`;
        const result = await pool.query(loginQuery);
        //console.log(result);
        res.cookie('jwt',refreshToken);
        res.json({accessToken});
        //res.sendStatus(200)
        
        
    } else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin}