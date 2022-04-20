const database = require("../../../models");
const Order = database.order;
const Op = database.Op;

// Retrieve all Orders from the database.
exports.findAll = (req: any, res: any) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Order.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.send(500).send({
        message: err.message || "Some error while retrieving orders."
      });
    });
};

exports.store = (req: any, res: any) => {
  // validate
  if (!req.body.code) {
    res.status(400).send({
      message: "code is required"
    });
    return;
  }

  // create new order
  const order = {
    name: req.body.name,
    code: req.body.code,
  };

  // store new order
  Order.create(order)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the order"
      });
    });
};

exports.findOne = (req: any, res: any) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.send(500).send({
        message: err.message || `error when retrieve order with id = ${id}`
      });
    });
};

exports.update = (req: any, res: any) => {
  const id = req.params.id;

  const order = {
    name: req.body.name,
    code: req.body.code,
  };

  Order.update(order, {
    where: { id: id }
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or request body is empty!`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id
      });
    });
};

exports.destroy = (req: any, res: any) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id }
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: `Could not delete Order with id=${id}`
      });
    });
};
