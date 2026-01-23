const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { initSocket } = require("./socket/socket");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


const routes = require("./Routes/userroutes");
app.use("/api", routes);


app.get("/", (req, res) => {
  res.send("Server is running");
});


const server = http.createServer(app);


initSocket(server);


server.listen(PORT)
  .on("listening", () => {
    console.log(`Server`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use`);
    } else {
      console.error("Server error:", err);
    }
    process.exit(1); 
  });
