const socketIo = require("socket.io");

const io = socketIo(3500);

let delivered = [];
let outstanding = [];
const clients = [];

function pushOrders(array) {
  for (i of array) {
    outstanding.push(i);
  }
}

io.on("connection", (client) => {
  clients.push(client);

  client.on("neworder", (order) => {
    console.log("NEW ORDER", order);
    outstanding.push(order);
    io.emit("pickupReady", order);
  });

  client.on("intransit-hub", (order) => {
    io.emit("intransit-driver", order);
  });

  client.on("delivered-hub", (order) => {
    delivered.push(order);
    outstanding.shift();
    io.emit("delivered", order);
  });
});
