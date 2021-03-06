

const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const cookieParser = require('cookie-parser');
const guestRouter = require("./router/guestRouter")
const hostRouter = require("./router/hostRouter")
const conversationRoute = require("./router/conversations");
const messageRoute = require("./router/messages");
const { checkGuest,checkHost } = require('./middleware/guestMiddleware');
const http = require('http')
const socketio = require('socket.io');
const path = require("path");



app.use(express.json());
app.use(cookieParser());
app.use(cors());
// for file in router
app.use('/guestRouter',guestRouter)
app.use('/hostRouter',hostRouter)
app.use('/conversationRoute',conversationRoute)
app.use('/messageRoute',messageRoute)

app.use('/', express.static(path.join(__dirname, '/FrontEnd/build')));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "FrontEnd/build/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);

//conect db
const uri =
  "mongodb+srv://masha:mesh_r1995@masha.lhput.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Create HTTP server.
 */
//  var port = parseInt(process.env.PORT || '8080');
// app.set('port', port);

//  const server = http.createServer(app);
//  var io = socketio(server,{
//    cors: {
//      origin: '*',
//      methods: ['GET', 'POST']
//    }
//  });
//  server.listen(port);
//  chat(io);

// socket.io
// const guests = [];
// io.on('connection', socket => {
//   socket.on('message', ({ name, message }) => {
//    // io.emit('message', { name, message })
//     console.log('message', { name, message })
//   })
// })



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