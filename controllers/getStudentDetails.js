const pool = require('../config/db');
const path = require('path');

const getStudentDetails = async (req,res)=>{
    try {
        // add coach to it ++++++++++++++++++++++++
        const body = req.body;
        // console.log("reached here ");
        const selectQuery = `SELECT * FROM "mapSchema".USERS where user_role = '2001' ;`;
        const result = await pool.query(selectQuery);
        //console.log(result.rows)
        return res.status(200).json({'students':result.rows});
      } catch (error) {
        console.error(error.message);
      }
}
module.exports = {getStudentDetails}
