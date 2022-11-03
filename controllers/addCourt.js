const pool = require('../config/db');
const path = require('path');



const addCourt = async (req,res)=>{
    try {
        const body = req.body;

        const insertIntoCourts = `INSERT INTO "mapSchema".courts (court_name) VALUES ('${body.courtName}');`
        const result = await pool.query(insertIntoCourts)
        return res.status(200).json({'message':'court added'});
        
    } catch (error) {
        console.error(error.message);
    }

}

module.exports = {addCourt}