const db = require("../configuration/database");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [username, email, hashedPassword, role],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "User already exists" });
        }

       
        res.status(201).json({
          id: result.insertId,
          username,
          email,
          role,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

module.exports = { register };
