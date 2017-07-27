const path=require("path");//npme gerek yok
const http=require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath=path.join(__dirname,"../public");
const port=process.env.PORT || 3000;
var app=express();
var server = http.createServer(app);
var io = socketIO(server); // web socket server


app.use(express.static(publicPath));

io.on("connection",(socket) => {
    console.log("New user connected");

    //socket.emit from Admin text welcome to chat app


    socket.emit("newMessage",{
       from:"Admin",
        text:"Welcome to  chat app",
        createdAt:new Date().getTime()
    });

    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit("newMessage",{
        from:"Admin",
        text:"New user joined the channel",
        createdAt:new Date().getTime()
    });

    socket.on("createMessage",(message) => {
       console.log("createMessage",message);
       io.emit("newMessage",{ // her baglantıyı emit eder
           from:message.from,
           text:message.text,
           createdAt:new Date().getTime()
       });


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
