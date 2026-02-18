const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

let onlineUsers = {};

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {

  socket.on("register", (username) => {
    onlineUsers[socket.id] = username || "Anonymous";
    io.emit("updateUsers", Object.values(onlineUsers));
  });

  socket.on("disconnect", () => {
    delete onlineUsers[socket.id];
    io.emit("updateUsers", Object.values(onlineUsers));
  });

});

server.listen(PORT, () => {
  console.log("APOS running on port " + PORT);
});
