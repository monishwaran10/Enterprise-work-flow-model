const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "localhost",  
  user: "root",
  password: "root",
  database: "enterprise",

});


(async () => {
  try {
    const conn = await pool.getConnection();
    console.log(" Connected");
    conn.release();
  } catch (err) {
    console.error( err);
  }
})();

module.exports = pool;
