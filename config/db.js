const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "12345678",
  host: "localhost",
  port: 8080,
  database: "map"
});

module.exports = pool;