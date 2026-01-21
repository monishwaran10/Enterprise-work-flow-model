const express = require("express");
const mysql=require('mysql2');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
app.use(cors()); 
app.use(bodyParser.json()); 

const routes=require("./Routes/userroutes");
app.use("/api",routes)




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
