var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'database-2.cbsa30c4ynuh.ap-northeast-2.rds.amazonaws.com',
    post: 3306,
    user: 'admin',
    password: 'Wngus!110',
    database: 'mydb'
});

module.exports = connection;