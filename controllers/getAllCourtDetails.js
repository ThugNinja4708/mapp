const pool = require('../config/db');
const path = require('path');

const getAllCourtDetails = async (req,res)=>{
    try {
        const body = req.body;
        // console.log("reached here ");
        const selectQuery = `SELECT * FROM "mapSchema".courts ;`;
        const result = await pool.query(selectQuery);
        //console.log(result.rows)
        return res.status(200).json({'courts':result.rows});
      } catch (error) {
        console.error(error.message);
      }

}
module.exports = {getAllCourtDetails}