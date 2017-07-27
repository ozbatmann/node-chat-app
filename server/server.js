const path=require("path");//npme gerek yok
const http=require("http");
const express = require("express");
const socketIO = require("socket.io");


const {generateMessage} = require("./utils/message");
const publicPath=path.join(__dirname,"../public");
const port=process.env.PORT || 3000;
var app=express();
var server = http.createServer(app);
var io = socketIO(server); // web socket server


app.use(express.static(publicPath));

io.on("connection",(socket) => {
    console.log("New user connected");

    //socket.emit from Admin text welcome to chat app


    socket.emit("newMessage",generateMessage("Admin","Welcome to the chat app"));


    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit("newMessage",generateMessage("Admin","New user joined"));

    socket.on("createMessage",(message) => {
       console.log("createMessage",message);
       io.emit("newMessage",generateMessage(message.from,message.text))// her baglantıyı emit eder




    //Broadcast yapıyorum
      /*  socket.broadcast.emit("newMessage",{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })
*/
    });


    socket.on("createEmail", (newEmail) => {
        console.log("CreateEmail",newEmail);
    });


    socket.on("disconnect",() => {
        console.log("User was disconnected");
    });
});


server.listen(port,() => { //createServer ile aynı
    console.log("Server is up on port "+port);
});
