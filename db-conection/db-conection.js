const mysql = require("mysql");

const con = mysql.createPool({
  connectionLimit: 10,
  host: 'localhot',
  user: 'root',
  password: '123',
  database: 'acme-dev'
});

module.exports = { con };
