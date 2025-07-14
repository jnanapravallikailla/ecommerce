let express = require("express");
let mongoose = require("mongoose");
const rt = require("./routes/routes");
let cors = require("cors");
let bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

let app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/pic", express.static("./pimg"));
app.use(cors());
app.use("/", rt);

// ✅ Dynamic port for deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
