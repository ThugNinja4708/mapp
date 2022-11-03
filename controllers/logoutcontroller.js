const pool = require('../config/db');
const queries= require('../config/queries');


//query motham chesthunam 

const handlelogout = async(req,res)=>{
    const cookies = req.cookies;
    const body = req.body;
    console.log(req);
    if(!cookies?.jwt) return res.status(204);
    const refreshToken = cookies.jwt;
    let allUsers="";
    try {
         allUsers = await pool.query(queries.getAllUsers);
      } catch (error) {
        console.error(error.message);
      }
    const foundUser = allUsers.rows.find(person=>person.refresh_token===refreshToken);
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true});
        return res.sendStatus(204);
    }
    const logoutQuery = `UPDATE "mapSch"users set refresh_token=' ' where user_id='${foundUser.user_id}'`;
        const result = await pool.query(logoutQuery);
        res.clearCookie('jwt',{httpOnly: true, sameSite: 'None', secure: true});
        res.sendStatus(204);
}


module.exports = {handlelogout}