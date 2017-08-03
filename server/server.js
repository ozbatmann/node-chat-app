const path=require("path");//npme gerek yok
const http=require("http");
const express = require("express");
const socketIO = require("socket.io");


const {generateMessage,generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const publicPath=path.join(__dirname,"../public");
const port=process.env.PORT || 3000;
var app=express();
var server = http.createServer(app);
var io = socketIO(server); // web socket server
var users=new Users();


app.use(express.static(publicPath));

io.on("connection",(socket) => {
    console.log("New user connected");

    //socket.emit from Admin text welcome to chat app



    socket.on("join",(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
          return callback("Name and room name are required.");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);


        io.to(params.room).emit("updateUserList",users.getUserList(params.room));

        //socket.leave("The office fans");

        //io.emit addmitted everybody connected -> io.to("The office fans");
        //broadcast -> socket.broadcast.to("The office fans");
        //socket.emit spesific to one user

        socket.emit("newMessage",generateMessage("Admin","Welcome to the chat app"));
        // socket.broadcast.emit from Admin text New user joined
        socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} has joined.`));


        callback();
    });


    socket.on("createMessage",(message,callback) => {
       var user=users.getUser(socket.id);

       if(user && isRealString(message.text)){
           io.to(user.room).emit("newMessage",generateMessage(user.name,message.text))// her baglantıyı emit eder
       }

        callback(); // indexdeki acknowledgementi calıstırıyor

    //Broadcast yapıyorum
      /*  socket.broadcast.emit("newMessage",{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })
*/
    });

    //listener for location
    socket.on("createLocationMessage",(coords) => {
        var user=users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });


    socket.on("createEmail", (newEmail) => {
        console.log("CreateEmail",newEmail);
    });



    socket.on("disconnect",function (){
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit("updateUserList",users.getUserList(user.room));
            io.to(user.room).emit("newMessage",generateMessage("Admin",`${user.name} has left`));
        }
    });
});


server.listen(port,() => { //createServer ile aynı
    console.log("Server is up on port "+port);
});
