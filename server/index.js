const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// on server side:
  // 1. connect and log socket id
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_appointment", (appointmentId) => {
    socket.join(appointmentId);
  });

  socket.on("send_message", (data) => {
    socket.to(data.appointmentId).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNINGon 3001");
});
