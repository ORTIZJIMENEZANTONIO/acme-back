const mysql = require("mysql");

const getDatabase = () => process.env.MYSQL_DATABASE || "delivery";
const getUser = () => process.env.MYSQL_USER || "root";
const getPass = () => process.env.MYSQL_PASSWORD || "root";
const getHost = () => process.env.MYSQL_HOST || "localhot";

const con = mysql.createPool({
  connectionLimit: 10,
  host: getHost(),
  user: getUser(),
  password: getPass(),
  database: getDatabase(),
});

module.exports = { con };
