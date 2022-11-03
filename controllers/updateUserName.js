const pool = require('../config/db');
const path = require('path');

const updateUserName = async (req,res) =>{
    try {
        const body = req.body;
        if( !body.userName ) return res.status(400).send({'messgae':"Email and password are required"});
        const updateQuery = `UPDATE "mapSchema".users SET user_name = '${body.userName}' WHERE user_id = ${body.userId} ;`;
        const result = await pool.query(updateQuery);
        //console.log(result);
        return res.status(200).json({'message':'user name updated..!'});
      } catch (error) {
        console.error(error.message);
      }
}
module.exports = {updateUserName}