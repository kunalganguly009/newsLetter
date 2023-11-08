const mongoose = require("mongoose")
var Schema = mongoose.Schema;
const validator = require('validator');

const newsletterFormData = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
    },
    bussiness:{type:String},
    sports:{type:String},
    technology:{type:String},
    entertainment:{type:String},
})

const Userdata = new mongoose.model("newsletterFormData" ,newsletterFormData )
module.exports = Userdata