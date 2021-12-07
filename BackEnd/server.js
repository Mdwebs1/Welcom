const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const app = express()

router.use(express.json())
app.use(express.json());
app.use(cookieParser());
app.use(cors())

//conect db
const uri =
  "mongodb+srv://masha:mesh_r1995@masha.lhput.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});