const db = require("../models/db");
const customer = db.customer;
const gender = db.gender;
const Op = db.Sequelize.Op;



const customerController = {
  
  async findCustomersByKeyword(req, res) {
    const keyword = req.params.id;
    try {
      var result = await customer.findAll({
        where: {
          [Op.or]: [
            { CUS_ID: { [Op.like]: keyword } },
            { CUS_FNAME: { [Op.like]: keyword } },
            { CUS_LNAME: { [Op.like]: keyword } },
            { CUS_ADDRESS: { [Op.like]: keyword } }
          ]
        }
      })

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
  },

  async addCustomer(req, res) {
    try {
       const Customer = {
          CUS_ID: req.body.CUS_ID,
          CUS_FNAME: req.body.CUS_FNAME,
          CUS_LNAME: req.body.CUS_LNAME,
          CUS_ADDRESS: req.body.CUS_ADDRESS,
          GEN_ID: req.body.GEN_ID
        };
      
      var result = await customer.create(Customer);
      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
  },
  async findAllCustomers(req, res) {
    try {
      var result = await customer.findAll({
        include: [
          {
            model: gender,
            as: "GENDER",
            attributes: [
              ["GEN_NAME", "GENDER"]
            ],
          }
        ]
      });

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
  },
  async updateCustomer(req, res) {
    try {
      const id = req.params.id;
      var result = await customer.update(req.body, {
        where: {
          CUS_ID: id
        }
      })
      if (result == 1) {
        res.send({
          message: `Update success!`,
          result
        });
      } else {
        res.send({
          message: `Cannot update customer with id=${id}. Maybe customer was not found`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating customer with id=" + id
      });
    }
  },
  async deleteCustomer(req, res) {
    try {
      const id = req.params.id;

      var result = await customer.destroy({
        where: {
          CUS_ID: id
        }
      })



      if (result == 1) {
        res.send({
          message: "Customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete customer with id=${id}. Maybe customer was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete customer with id=" + id
      });
    }
  }

}

module.exports = customerController;