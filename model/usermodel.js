const mongoose = require("mongoose");
const registerschema = require("../schema/userschema");


const usermodel = mongoose.model("users",registerschema);

module.exports = usermodel;