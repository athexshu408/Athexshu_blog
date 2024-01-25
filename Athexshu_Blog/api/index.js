const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const CategoryRoute = require("./routes/categories");
const ProfileRoute = require("./routes/profile")
const multer = require ("multer")
const path = require("path");
//import cors from "cors"
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")))


mongoose
  .connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     // To use mongoose's default `createIndex` function instead of the deprecated `ensureIndex`
  
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Backend Is Running....");
    });
  })
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination: (req,file, cb) => {
    cb(null, "images");
    },
    filename: (req,file,cb) =>{
    cb(null,req.body.name);
    },
    });

    const upload = multer({ storage: storage });
   app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
     });

  app.use("/api/auth", authRoute);
  app.use("/api/users", usersRoute);
  app.use("/api/posts", postsRoute);
  app.use("/api/categories", CategoryRoute);
  app.use("/api/profile", ProfileRoute);

app.use("/", (req, res) => {
  console.log("hey this is atharv from backend");
});

//app.use("/api/auth", authRoute);
