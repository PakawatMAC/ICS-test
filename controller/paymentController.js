const db = require("../models/db");
const payment = db.payment;
const Op = db.Sequelize.Op;



const paymentController = {
  
  async findPaymentEvidByKeyword(req, res) {
    const keyword = req.params.id;
    try {
      var result = await payment.findAll({
        where: {
          [Op.or]: [

            { PAY_EVID: { [Op.like]: keyword } }

          ]
        }
      })

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payments."
      });
    }
  },

  async findAllPayments(req, res) {
    try {
      var result = await payment.findAll();

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payments."
      });
    }
  },
  async updatePayment(req, res) {
    try {
      const id = req.params.id;
      var result = await payment.update(req.body, {
        where: {
          PAY_ID: id
        }
      })
      if (result == 1) {
        res.send({
          message: `Update success!`,
          result
        });
      } else {
        res.send({
          message: `Cannot update payment with id=${id}. Maybe payment was not found`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating payment with id=" + id
      });
    }
  },
  async deletePayment(req, res) {
    try {
      const id = req.params.id;

      var result = await payment.destroy({
        where: {
          PAY_ID: id
        }
      })



      if (result == 1) {
        res.send({
          message: "Payment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete payment with id=${id}. Maybe payment was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete payment with id=" + id
      });
    }
  }

}

module.exports = paymentController;