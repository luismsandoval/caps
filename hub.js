const socketIo = require("socket.io");

const io = socketIo(3500);

io.on("connection", (client) => {
  client.on("neworder", (order) => {
    console.log("NEW ORDER", order);
    io.emit("pickupReady", order);
  });

  client.on("intransit-hub", (order) => {
    io.emit("intransit-driver", order);
  });

  client.on("delivered-hub", (order) => {
    io.emit("delivered", order);
  });
});
