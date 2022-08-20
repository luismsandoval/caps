const { io } = require("socket.io-client");
const Chance = require("chance");
const chance = new Chance();

const socket = io("ws://localhost:3500");

function inTransit(payload) {
  return {
    event: "in-transit",
    time: chance.timestamp(),
    payload: payload,
  };
}

function packageDelivered(payload) {
  return {
    event: "delivered",
    time: chance.timestamp(),
    payload: payload,
  };
}

socket.on("intransit-driver", (order) => {
  console.log(`DRIVER: picked up ${order.orderID}`);
  console.log("EVENT", inTransit(order));
  socket.emit("delivered-hub", order);
});

socket.on("delivered", (order) => {
  console.log(`DRIVER: delivered ${order.orderID}`);
  console.log("EVENT", packageDelivered(order));
});
