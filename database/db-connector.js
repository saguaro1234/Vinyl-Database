require('dotenv').config();
// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : 'cs340_happshig',
    password          : '4179',
    database          : 'cs340_happshig'
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;