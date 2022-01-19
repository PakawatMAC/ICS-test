const db = require("../models/db");
const payment = db.payment;
const customer = db.customer;
const orderitem = db.orderitem;
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
            { "$Customer.CUS_FNAME$": { [Op.like]: "%" + keyword + "%" } },
            { "$Customer.CUS_LNAME$": { [Op.like]: "%" + keyword + "%" } },
          ]
        },
        include: [
          {
            model: customer,
            as: "Customer"
            
          },{
            model: orderitem,
            as: "Orderitems"
          },{
            model: payment,
            as: "PAYMENT"
          }
        ]
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
      const prodqty = await product.findAll({
        where: {
          PROD_ID: req.body.PROD_ID
        }
      });
      if((req.body.PROD_QTY - prodqty[0].dataValues.PROD_QUANTITY ) > 0){
        res.send("สินค้าไม่เพียงพอ");
      } else {
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
      const Orderitem = {
        ORD_ID: result2.ORD_ID,
        PROD_ID: req.body.PROD_ID,
        Prod_qty: req.body.PROD_QTY,
      }

      var result3 = await orderitem.create(Orderitem);

      const prodid = Orderitem.PROD_ID;
      console.log(prodqty[0].dataValues.PROD_QUANTITY);
      var updateprod = await product.update({PROD_QUANTITY: prodqty[0].dataValues.PROD_QUANTITY - req.body.PROD_QTY}, {
        where: {
          PROD_ID: prodid
        }
      })

      var ares = [result, result2, result3, updateprod];
      res.send(ares);

      }
        
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
            model: orderitem,
            as: "Orderitems"
          },
          {
            model: customer,
            as: "Customer"
          }
        ]
      });

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    }
  },
  async updateOrder(req, res) {
    try {
      const id = req.params.id;
      var result = await order.update(req.body, {
        where: {
          ORD_ID: id
        }
      })
      if (result == 1) {
        res.send({
          message: `Update success!`,
          result
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe order was not found`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating order with id=" + id
      });
    }
  },
  async deleteOrder(req, res) {
    try {
      const id = req.params.id;

      var result = await order.destroy({
        where: {
          ORD_ID: id
        }
      })



      if (result == 1) {
        res.send({
          message: "Order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete order with id=${id}. Maybe order was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete order with id=" + id
      });
    }
  }

}

module.exports = orderController;