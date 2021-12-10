const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const cookieParser = require('cookie-parser');
const guestRouter = require("./router/guestRouter")
const hostRouter = require("./router/hostRouter")
const { checkGuest,checkHost } = require('./middleware/guestMiddleware');


app.use(express.json());
app.use(cookieParser());
app.use(cors());
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


// cookies

app.get('/set-cookies', (req, res) => {
    //  res.setHeader('Set-Cookie','newAuther=true')
    res.cookie('newAuther',false)
    res.cookie('isAuther',true,{maxAge:1000 * 60 * 60 * 24 , httpOnly:true})
      res.send('you got the new cookie')
  })
  
  app.get('/read-cookies', (req, res) => {
      const cookies = req.cookies
      console.log(cookies.newAuther)
      res.json(cookies)
  })
  
  const PORT = process.env.PORT || 8080;
  app.listen(PORT);
  const connection = mongoose.connection;
  connection.once(
    "open",
    () => console.log("Connected to DB"),
    connection.on("disconnected", () => console.log("mongo disconnected")),
    connection.on("error", (err) => {
      console.log("connection error", err);
    })
  );

  app.get('*', checkGuest,checkHost);