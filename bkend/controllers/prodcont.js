let {v4}=require("uuid")
let multer=require("multer")
const pm = require("../models/prodmodel")
let fs=require("fs")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './pimg')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })
let add=async(req,res)=>{
    try{
let data=new pm({...req.body,"_id":v4(),"pimg":req.file.filename})
await data.save()
res.json({"msg":"product added"})
    }
    catch(err)
    {
       
        
res.json({"err":"error in adding products"})
    }
}
let getall=async(req,res)=>{
    try{
let data=await pm.find()
res.json(data)
    }
    catch(err)
    {
res.json({"err":"error in getting prod details"})
    }
}
let getr=async(req,res)=>{
    try{
        let rid=req.params.rid
let data=await pm.find({"rid":rid})
res.json(data)
    }catch(err)
    {
        console.log(err.message);
        
res.json({"err":"error in getting retailer details"})
    }
}
let getbyid=async(req,res)=>{
    try{
let data=await pm.findById(req.params.pid)
res.json(data)
    }
    catch(err)
    {
console.log(err);

    }
}
let addcomm=async(req,res)=>{
    try{
let data=await pm.findByIdAndUpdate({"_id":req.body.pid},{$push:{"comm":req.body}})
res.json({"msg":"comment added "})
    }
    catch(err)
    {
console.log(err);

    }
}
let search=async(req,res)=>{
    try{
        let ipt=req.body.search || ""
        let regex=new RegExp(ipt,"i")
        let data=await pm.find({name:{$regex:regex}})
        res.json(data)
    }catch(err)
    {
        res.json({"err":"cannot find such type of products"})
    }
}
let delprod=async(req,res)=>{
    console.log(req.params.pid);
    
    try{
await pm.findByIdAndDelete({"_id":req.params.pid})
res.json({"msg":"product deleted"})
    }
    catch(err)
    {
console.log(err);

    }
}
let getrt=async(req,res)=>{
    try{
let data=await pm.find({"rid":req.params.rid})
res.json(data)
    }
    catch(err)
    {
console.log(err);

    }
}
let upd=async(req,res)=>{
    try{
await pm.findByIdAndUpdate({"_id":req.body._id},req.body)
res.json({"msg":"prod updated"})
    }
    catch(err)
    {
console.log(err);

    }
}
let updimg=async(req,res)=>{
    try{
 
let obj=await pm.findByIdAndUpdate({"_id":req.body._id},{"pimg":req.file.filename})
fs.rm(`./pimg/${obj.pimg}`,()=>{})
res.json({"msg":"prod img updated"})
    }
    catch(err)
    {
console.log(err);

    }
}
module.exports={add,getall,upload,getr,getbyid,addcomm,search,getrt,delprod,upd,updimg}