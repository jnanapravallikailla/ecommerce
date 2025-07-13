let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const nodemailer = require("nodemailer");
const um = require("../models/usermodel");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "mohanasushmitailla@gmail.com",
      pass: "wmxijcfugekbyory",
    },
  });
let sendotp=async(req,res)=>{
    try{
  let obj=await um.findById(req.params.uid)
  if(obj){
    let otp =Math.floor(Math.random()*99999+10000)
    await um.findByIdAndUpdate({"_id":obj._id},{"otp":otp})
    const info = await transporter.sendMail({
        from: '"wowmakers photography" <mohanasushmitailla@gmail.com>',
        to: `${obj._id}`,
        subject: "OTP verification",
        text:`${otp}`,
        
      });
      res.json({"msg":"otp sent"})
  }
  else{
    res.json({"msg":"check email"})
  }
    }
    catch(err)
    {
      console.log(err.message);
      
        res.json({"err":"error otp gen"})
    }
}
let resetpwd=async(req,res)=>{
    try{
let obj=await um.findById(req.body.uid)
if(obj.otp==req.body.otp)
{
    let pwdhash=await bcrypt.hash(req.body.pwd,10)
    await um.findByIdAndUpdate({"_id":req.body.uid},{"pwd":pwdhash,"otp":""})
    res.json({"msg":"pwd reset done"})
}
else{
    res.json({"msg":"provide valid otp"})
}
    }
    catch(err)
    {
        res.json({"err":"error in reset pwd"})
    }
}
module.exports={sendotp,resetpwd}