const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "rate_my_professor",
  password: "password",
  port: 5432,
});
