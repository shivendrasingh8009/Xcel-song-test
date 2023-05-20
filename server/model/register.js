const mongoose = require("mongoose");

const schema = new mongoose.Schema({
 
  id: {
    type: String,
  },
  email: {
    type: String,
    default: true,
  },
  
  password: {
    type: String,
    default: true,
  },
});

const register = mongoose.model("register", schema);

module.exports = register;
