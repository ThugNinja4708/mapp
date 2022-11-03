const pool = require('../config/db');
const path = require('path');

const giveAttendance = async (req,res)=>{
    try {
        const d = new Date();
        const currentDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay()
        const body = req.body;
        const ifAlreadyPresentQuery = `SELECT student_id FROM "mapSchema".attendance WHERE student_id = ${body.userId} AND date = '${currentDate}' LIMIT 1`;
        const insertAttendanceQuery = `INSERT INTO "mapSchema".attendance (student_id, date, status) VALUES (${body.userId}, '${currentDate}' , '${body.status}');`;
        const updateAttendanceQuery = `UPDATE "mapSchema".attendance SET status = '${body.status}' WHERE student_id = ${body.userId} AND date = '${currentDate}';`;
        const ifAlreadyPresent = await pool.query(ifAlreadyPresentQuery)
        if(ifAlreadyPresent.rowCount){
          await pool.query(updateAttendanceQuery);
          return res.status(200).json({'message': 'attendance updated'});
        }
        else{
          await pool.query(insertAttendanceQuery);
          return res.status(200).json({'message':'attendance inserted'});
        }
       
        // return res.status(400).json({'students':result.rows});
      } catch (error) {
        console.error(error.message);
      }
}
module.exports = {giveAttendance}