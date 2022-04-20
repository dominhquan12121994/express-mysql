module.exports = (app: any) => {
  const orderController = require("../controllers/order.controller");

  const router = require("express").Router();

  // Retrieve all Orders
  router.get("/", orderController.findAll);

  // Store new order
  router.post("/", orderController.store);

  router.get("/:id", orderController.findOne);

  router.patch("/:id", orderController.update);

  router.delete("/:id", orderController.destroy);

  app.use("/api/orders", router);
};
