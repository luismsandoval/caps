const { it } = require("test");
const { packageDelivered } = require("../vendor");

const testOrder = {
  event: "delivered",
  time: 83979623,
  payload: {
    store: "Amgen Inc.",
    orderID: "752ad359d1fdbb8955579b281357046b38e6abd5",
    customer: "Murphy",
    address: "1100 Ledka Square",
  },
};

describe("vendor", () => {
  it("logs when delivered", () => {
    const spy = jest.spyOn(console, "log");
    packageDelivered(testOrder);
    expect(spy).toHaveBeenCalledWith("EVENT", testOrder);
  });
});
