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




const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    

    const [results] = await db.execute(sql, [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginverify=async(req,res=>{
  try{
  if(!token){
    return res.json({tokenstatus:"not login"});
  }
  else{
    jwt.verify(token,"10decoders",async(err,decoded)=>{
      if(err){
        console.log("token");
        return res.json({tokenstatus:"error"})
      }
      else{
        if(!res.body){
          res.body={};
        }
        const{result}=await db.query(`select * from users where email=?`,[decoded.email]);
        res.body.email=decoded.email;
        res.body.id=decoded.id;
        return res.json({tokenstatus:"verified",
          id:decoded.id,
          name:result[0].name,
          email:result[0].email
        })
      }
    })}
  }
    catch(err){
      console.log(err);
    }
  
const verifyUser=()=>{
  try{
  const token=req.cookies.auth_token;
  if(!token){
    return res.status(401).json({message:"no token"});
  }
  jwt.verify(token,"10decoders",(err,decoded)=>{
    if(err){
      return res.status(403).json("message:invalid token");
    }
    req.user=decoded;
    next();
  })
  }
  catch(err){
    console.log(err);
  }
}

})
module.exports = { register,login,verifyUser,loginverify };
