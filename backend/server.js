// create a request for signin and signup
const express = require('express');
const sessions = require('express-session');
const http = require('http');
var parseUrl = require('body-parser');
const app = express();

var mysql = require('mysql');
let encodeUrl = parseUrl.urlencoded({ extended: false });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gaurimysql@123", 
    database: "nodedemo"
});


const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => {
//     res.sendFile('/register.html', { root: path.join(__dirname, 'public') });
//   });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/register', encodeUrl, (req, res) => {
    var fname = req.body.fullname;
    var mail = req.body.email;
    var companyName = req.body.companyname;
    var Designation = req.body.designation;
    var clubName = req.body.clubname;
    var SpouseName = req.body.spousename;
    var DOB = req.body.dob;
    var marriageAnniversary = req.body.anniversarydate;
    var address = req.body.address;
    var city = req.body.city;
    var pincode = req.body.pincode;
    var phNo = req.body.phoneno;

    con.connect(function(err){
        if(err)
        {
            console.log(err);
        };
        con.query(`SELECT * FROM users WHERE email = '${mail}'`, function(err, result){
            if(err){
                console.log(err);
            };
            if(result.length > 0){
                res.sendFile(__dirname + '/regfail.html');
            }

            
            var sql = `INSERT INTO users (fullname,email,company_name,designation,club_Name,spouse_Name,DOB,marriage_anniversary,address,city,pincode,phone_number) 
            values ('${fname}','${mail}', '${companyName}', '${Designation}','${clubName}','${SpouseName}','${DOB}','${marriageAnniversary}',
            '${address}', '${city}','${pincode}','${phNo}')`;
                con.query(sql, function (err,result) {
                if (err){
                    console.log(err);
                }else{
                    res.sendFile(__dirname + '/regsuccess.html');
                }
            });
        })
    })
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})