let mongoose=require("mongoose")
let psch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "desc":String,
    "cat":String,
    "price":String,
    "rid":String,
   
    "comm":[],
    "pimg":String
})
let pm=mongoose.model("prod",psch)
module.exports=pm