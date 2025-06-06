// Citation for the following code:
// Date: 5/29/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// Our project was adapted from the starter code on Canvas.

require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : process.env.DB_HOST,
    user              : process.env.DB_USER,
    password          : process.env.DB_PASS,
    database          : process.env.DB_NAME
}).promise();

module.exports = pool;
