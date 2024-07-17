import mysql2 from 'mysql2'

const con=mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'EmployeeManageProject'
});

con.connect(function(err){
    if(err){
        console.log("connection  error")
    }
    else{
        console.log("Connected to database");
    }
})

export default con;