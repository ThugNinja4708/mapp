const pool = require('../config/db');
const path = require('path');

const getAllCoachDetails = async (req,res)=>{
    try {
        const body = req.body;
    
        const selectQuery = `SELECT * FROM "mapSchema".coaches ;`;
        const result = await pool.query(selectQuery);
        //console.log(result.rows)
        return res.status(200).json({'coaches':result.rows});
      } catch (error) {
        console.error(error.message);
      }


}

module.exports = {getAllCoachDetails}