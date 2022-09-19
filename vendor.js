const { io } = require("socket.io-client");
const Chance = require("chance");
const chance = new Chance();

const socket = io("ws://localhost:3500");

function newOrder() {
  const store = chance.company();
  return {
    store: store,
    orderID: chance.hash(),
    customer: chance.last(),
    address: chance.address(),
  };
}

function pickUp(payload) {
  return {
    event: "pickup",
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

socket.on("pickupReady", (order) => {
  console.log(`VENDOR: order ${order.orderID} ready for pickup`);
  console.log("EVENT", pickUp(order));
  socket.emit("intransit-hub", order);
});

socket.on("delivered", (order) => {
  console.log(`VENDOR: thank you for delivering ${order.orderID}`);
  console.log("EVENT", packageDelivered(order));
});

socket.emit("neworder", { ...newOrder() });

setInterval(() => {
  socket.emit("neworder", newOrder());
}, 5000);

module.exports = {
  packageDelivered: packageDelivered,
};
