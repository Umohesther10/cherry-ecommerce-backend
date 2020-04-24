const mysql= require("mysql");
const dbConfig= require("../config/db.congfig.js");

const connection= mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.user,
    password: dbConfig.PASSWORD,
    database: dbConfig.db
});

connection.connect(error=>{
    if (error) throw error;
    console.log("Database connected...");
});

module.exports = connection;
