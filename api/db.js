import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

con.connect(function (err) {
    if (err) {
        console.error("Connection error:", err);
    } else {
        console.log("Connected to database");
    }
});

export default con;
