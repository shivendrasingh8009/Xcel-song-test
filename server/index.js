const express = require('express');
require("./db/connection")
const bodyParser = require('body-parser');
const cors = require('cors');
const AddSong=require("./api/curd")
const userDetails=require("./api/register")


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("./uploads"));
app.use("/images", express.static("./images"));

app.use("/test",AddSong)
app.use("/admin",userDetails)








const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
