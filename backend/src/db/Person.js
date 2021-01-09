const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    username:{type:String},
    password:{type:String}
});
const Register = new mongoose.model("PersonRecord",Schema);

module.exports = Register;