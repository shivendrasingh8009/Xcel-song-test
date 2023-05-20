const mongoose = require("mongoose")
 const connection= mongoose.connect("mongodb://0.0.0.0:27017/musicapp").then(()=>{
    console.log("MONGO DB IS CONNECTED>>>>>>>>>>>>")
  }).catch((error)=>{
    console.log("ERROR>>>>>>>",error)
  })


module.exports = connection;