let express=require("express")
let mongoose=require("mongoose");
const rt = require("./routes/routes");
let cors=require("cors")
let bodyParser=require("body-parser")
mongoose.connect("mongodb://127.0.0.1:27017/ecom").then(()=>{
    console.log("ok");
    
})
let app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({"extended":true}))
app.use("/pic",express.static("./pimg"))
app.use(cors())
app.use("/",rt)
app.listen(5000)