let bcrypt=require("bcryptjs")
let jwt=require("jsonwebtoken")
const um = require("../models/usermodel")
let adduser=async(req,res)=>{
    try{
       let obj=await um.findById(req.body._id)
       if(obj){
        res.json({"msg":"already account exist"})
       }
       else{
        let pwdhash= await bcrypt.hash(req.body.pwd,10) 
        let data=new um({...req.body,"pwd":pwdhash})
        await data.save()
       }
    }
    catch(err)
    {
        res.json({"err":"error in adding user"})
    }
}
let login =async(req,res)=>{
    try{
   let obj=await um.findById(req.body._id)
   if(obj){
    let f=await bcrypt.compare(req.body.pwd,obj.pwd)
    if(f)
    {
        res.json({"token":jwt.sign({"_id":obj._id},"1234"),"uid":obj._id,"name":obj.name,"role":obj.role})
    }
    else{
        res.json({"msg":"check password"})
    }
   }
   else{
    res.json({"msg":"check email"})
   }
    }
    catch(err){
        console.log(err.message)
            res.json({"err":"error in login"})
    }
}
let islogin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, "1234");
    req.uid = decoded._id;  
    next();
  } catch (err) {
    res.status(401).json({ err: "Please login" });
  }
};

let isadmin=async(req,res,next)=>{
    try{
// let obj=await um.findById({"_id":req.headers.uid})
let obj = await um.findById(req.uid)

if(obj.role=="admin" || obj.role=="retailer")
{
    next()
}
else{
    res.json({"msg":"you are not admin or retailer"})
}
    }
    catch(err)
    {
res.json({"err":"you rae not authorized person"})
    }
}
module.exports={login,adduser,islogin,isadmin}

