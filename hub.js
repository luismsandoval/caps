const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const Chance = require("chance");
const chance = new Chance();

function newOrder() {
  const store = chance.company();
  return {
    store: store,
    orderID: chance.hash(),
    customer: chance.last(),
    address: chance.address(),
  };
}

eventEmitter.on("neworder", (order) => {
  console.log("NEW ORDER", order);
  eventEmitter.emit("pickup", order);
});

function pickUp(payload) {
  return {
    event: "pickup",
    time: chance.timestamp(),
    payload: payload,
  };
}

eventEmitter.on("pickup", (order) => {
  console.log(`VENDOR: order ${order.orderID} ready for pickup`);
  console.log("EVENT", pickUp(order));
  eventEmitter.emit("intransit", order);
});

function inTransit(payload) {
  return {
    event: "in-transit",
    time: chance.timestamp(),
    payload: payload,
  };
}

eventEmitter.on("intransit", (order) => {
  console.log(`DRIVER: picked up ${order.orderID}`);
  console.log("EVENT", inTransit(order));
  eventEmitter.emit("delivered", order);
});

function packageDelivered(payload) {
  return {
    event: "delivered",
    time: chance.timestamp(),
    payload: payload,
  };
}

eventEmitter.on("delivered", (order) => {
  console.log(`DRIVER: delivered ${order.orderID}`);
  console.log(`VENDOR: thank you for delivering ${order.orderID}`);
  console.log("EVENT", packageDelivered(order));
});

eventEmitter.emit("neworder", { ...newOrder() });

setInterval(() => {
  eventEmitter.emit("neworder", newOrder());
}, 5000);
