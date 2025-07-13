const cm = require("../models/cartmodel")
let {v4}=require("uuid")
let addcart =async(req,res)=>{
    try{
let obj=await cm.find({"uid":req.body.uid,"pid":req.body.pid})
if(obj.length==0)
{
    let data =new cm({...req.body,"_id":v4()})
    await data.save()
    res.json({"msg":"product added"})
}
else{
    await cm.findByIdAndUpdate({"_id":obj[0]._id},{$inc:{"qty":1}})
    res.json({"msg":"product qty inc"})
}
    }
    catch(err){
        console.log(err.message);
        
res.json({"err":"error in adding product to cart"})
    }
}
let getcart=async(req,res)=>{
    try{
let data=await cm.find({"uid":req.params.uid})
res.json(data)
    }
    catch(err)
    {
console.log(err.message);

    }
}
let incqty=async(req,res)=>{
    try{
await cm.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":1}})
res.json({"msg":"prod qty inc"})
    }
    catch(err)
    {
console.log(err.message);

    }
}
let decqty=async(req,res)=>{
    try{
await cm.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":-1}})
res.json({"msg":"prod qty decremented"})
    }
    catch(err)
    {
console.log(err.message);

    }
}
let delcart=async(req,res)=>{
    try{
await cm.findByIdAndDelete({"_id":req.params.cid})
res.json({"msg":"prod deleted"})
    }
    catch(err)
    {
console.log(err.message);

    }
}
module.exports={addcart,getcart,incqty,decqty,delcart}