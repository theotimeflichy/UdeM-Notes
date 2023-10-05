const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

database.connect();

function queryDatabase(sql, params) {
    return new Promise((resolve, reject) => {
        database.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { database, queryDatabase };