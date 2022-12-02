const { Sequelize } = require("sequelize");

const getDatabase = () => process.env.MYSQL_DATABASE || "delivery";
const getUser = () => process.env.MYSQL_USER || "root";
const getPass = () => process.env.MYSQL_PASSWORD || "root";
const getHost = () => process.env.MYSQL_HOST || "localhost";

const con = new Sequelize(getDatabase(), getUser(), getPass(), {
  connectionLimit: 10,
  host: getHost(),
  dialect: "mysql",
});

module.exports = { con };
