let mongoose=require("mongoose")
let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "role":String,
    "pwd":String,
    "otp":String
})
let um=mongoose.model("users",usersch)
module.exports=um