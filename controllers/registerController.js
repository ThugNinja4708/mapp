const pool = require('../config/db');
//const queries= require('../config/queries');

// call to db

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async(req,res)=>{
    const body = req.body;

    console.log("register:",req.body);
    if(!body.userName||!body.userPassword) return res.status(400).json({'messgage':'Username and password requrired'});
    try {
        const selectQuery = `SELECT user_email FROM "mapSchema".users where user_role = '2001' AND user_email = '${body.userEmail}' LIMIT 1;`; //Change if not working
        const ifExist = await pool.query(selectQuery);
        if(ifExist.rowCount != 0) return res.sendStatus(409);
      } catch (error) {
        console.error(error.message);
      }
  

    try{
        const hashedPad = await bcrypt.hash(body.userPassword,10);
        const insertQuery = `INSERT INTO "mapSchema".users(user_name, user_email, user_password, user_role, refresh_token) VALUES ( '${body.userName}', '${body.userEmail}', '${hashedPad}', '2001','');`;
        const insertIntoStudents = `INSERT INTO "mapSchema".students (user_id) SELECT user_id FROM "mapSchema".users WHERE user_email = '${body.userEmail}';`;
        const insertedRowInUsers = await pool.query(insertQuery);
        const insertedRowInStudents = await pool.query(insertIntoStudents);
        res.status(201).json({ 'success': `New user ${body.userName} created!` });
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser}
