const { orderdetail } = require("../models/db");
const db = require("../models/db");

const payment = db.payment;
const customer = db.customer;
const orderdetail = db.orderdetail;
const order = db.order;
const product = db.product;
const Op = db.Sequelize.Op;



const orderController = {
  
  async findOrdersByKeyword(req, res) {
    const keyword = req.params.id;
    try {
      var result = await order.findAll({
        where: {
          [Op.or]: [

            { ORD_STATUS: { [Op.like]: keyword } },
            { ORD_TOTAL: { [Op.like]: keyword } },
            { "$CUS_ID.CUS_FNAME$": { [Op.like]: "%" + keyword + "%" } },
            { "$CUS_ID.CUS_LNAME$": { [Op.like]: "%" + keyword + "%" } },
          ]
        }
      })

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    }
  },

  async addOrder(req, res) {
    try {
        const Payment = {

          PAY_AMOUNT: req.body.PAY_AMOUNT,
          PAY_EVID: req.body.PAY_EVID,

        };

        var result = await payment.create(Payment);

       const Order = {

          ORD_STATUS: req.body.ORD_STATUS,
          ORD_TOTAL: req.body.ORD_TOTAL,
          PAY_ID: result.PAY_ID,
          CUS_ID: req.body.CUS_ID

        };

        var result2 = await order.create(Order);

      const Orderdetail = {
        ORD_ID: result2.ORD_ID,
        PROD_ID: result.PROD_ID,
        PROD_QTY: result.PROD_QTY,
      }

      var result3 = await orderdetail.create(Orderdetail);

      const prodid = Orderdetail.PROD_ID;

      var updateprod = await product.update({PROD_ID: db.Sequelize.literal('PROD_ID - Orderdetail.PROD_QTY')}, {
        where: {
          PROD_ID: prodid
        }
      })

      var ares = {result, result2, result};
      res.send(ares);

      
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    }
  },
  async findAllOrders(req, res) {
    try {
      var result = await order.findAll({
        include: [
          {
            model: payment,
            as: "PAYMENT",
            attributes: [
              ["PAY_AMOUNT", "AMOUNT"],
              ["PAY_EVID", "EVIDENCE"]
            ],
          },
          {
            model: orderdetail,
            as: "orderdetail"
          },
          {
            model: customer,
            as: "customer"
          }
        ]
      });

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving genders."
      });
    }
  },
  async updateOrder(req, res) {
    try {
      const id = req.params.id;
      var result = await gender.update(req.body, {
        where: {
          GEN_ID: id
        }
      })
      if (result == 1) {
        res.send({
          message: `Update success!`,
          result
        });
      } else {
        res.send({
          message: `Cannot update gender with id=${id}. Maybe gender was not found`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating gender with id=" + id
      });
    }
  },
  async deleteGender(req, res) {
    try {
      const id = req.params.id;

      var result = await gender.destroy({
        where: {
          GEN_ID: id
        }
      })



      if (result == 1) {
        res.send({
          message: "Gender was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete gender with id=${id}. Maybe gender was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete gender with id=" + id
      });
    }
  }

}

module.exports = orderController;