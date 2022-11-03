const pool = require('../config/db');
const queries= require('../config/queries');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const handleRefreshToken = async(req,res)=>{
    const cookies = req.cookies;
     if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    let allUsers="";
        try {
             allUsers = await pool.query(queries.getAllUsers);
          } catch (error) {
            console.error(error.message);
          }
    const foundUser = allUsers.rows.find(person=>person.refresh_token===refreshToken);
    if(!foundUser) return res.sendStatus(403);
    
     jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.user_id !== decoded.userId) return res.sendStatus(403);
             const roles = Object.values(foundUser.user_role);
             const accessToken = jwt.sign(
                {
                    "UserInfo":{
                    "username": foundUser.username,
                    "roles": roles,
                    "userId":foundUser.user_id
                }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1d' }
            );
            res.json({accessToken})
        }
     )
        
}


module.exports = {handleRefreshToken}