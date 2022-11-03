const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieparser = require('cookie-parser')
const PORT = 8000;

app.use(cookieparser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));


//++++++++++++++++++++++++ user functionallity +++++++++++++++++++++++++
app.use('/registerUser',require('./routes/register'));
app.use('/loginUser',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'))// not done 
app.use('/logout',require('./routes/logout'))// not done 
app.use('/updateUserName' , require('./routes/updateUserName'))


// ++++++++++++++++++++++++++++++++ Admin functionallity +++++++++++++++++++++++++
app.use('/convertToCoach' , require('./routes/convertToCoach'))
app.use('/getAllCoachDetails' , require('./routes/getAllCoachDetails'))
app.use('/addCourt' , require('./routes/addCourt'))
app.use('/getAllCourtDetails' , require('./routes/getAllCourtDetails'))
//app.use('/deleteStudent' , require('./routes/deleteStudent'))
//student details 

// add coach to court


//delete student


//+++++++++++++++++ Coach functionallity ++++++++++++++++++++++++++++++++++++
app.use('/getStudentDetails' , require('./routes/getStudentDetails'))
app.use('/giveAttendance' , require('./routes/giveAttendance'))


app.use(verifyJWT);
app.use('/logout',require('./routes/logout'));


app.listen(PORT,()=>console.log(`server started at ${8000}`));
