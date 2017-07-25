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

    socket.emit("newMessage",{
       from:"can",
        text:"Gorusuruz abi",
        createAt:231
    });

    socket.on("createMessage",(message) => {
       console.log("createMessage",message);
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
