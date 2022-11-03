const pool = require('../config/db');
const path = require('path');

const convertToCoach = async (req,res)=>{
    const body = req.body;
    //court id not inserted 
    const updateQuery = `UPDATE "mapSchema".users SET user_role = '2000' WHERE user_id = '${body.userId}'   ;`
    const checkInAttendance = `SELECT student_id FROM "mapSchema".attendance WHERE student_id = '${body.userId}' LIMIT 1; `
    const deleteFromStudents = `DELETE FROM "mapSchema".students WHERE student_id = '${body.userId}';`
    const insertIntoCoachs = `INSERT INTO "mapSchema".coaches (coach_id) VALUES ('${body.userId}');`
    const checkIfAlreadyCoach = `SELECT coach_id FROM "mapSchema".coaches WHERE coach_id = ${body.userId} LIMIT 1;`
    try {
        const ifExist = await pool.query(checkInAttendance);
        const ifAlreadyCoach = await pool.query(checkIfAlreadyCoach)
        if(ifExist.rowCount !=0 ){
            return res.status(400).json({'message':'can not convert a student to a coach '});
        }
        else if( ifAlreadyCoach.rowCount !=0 ){
            return res.status(400).json({'message':'already a coach ..!! '});
        }
        else{
            console.log();
            await pool.query(updateQuery)
            await pool.query(deleteFromStudents)
            await pool.query(insertIntoCoachs)
            return res.status(200).json({'message': 'converted to coach'});
        }
    } catch (error) {
        console.error(error.message);
    }


}
module.exports = {convertToCoach}