const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const app = express()
const guestRouter = require("./router/guestRouter")
const hostRouter = require("./router/hostRouter")

router.use(express.json())
app.use(express.json());
app.use(cookieParser());
app.use(cors())
// for file in router
app.use('/guestRouter',guestRouter)
app.use('/hostRouter',hostRouter)


//conect db
const uri =
  "mongodb+srv://masha:mesh_r1995@masha.lhput.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});