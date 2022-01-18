const db = require("../models/db");
const product = db.product;
const Op = db.Sequelize.Op;



const productController = {
  
  async findProductsByKeyword(req, res) {
    const keyword = req.params.id;
    try {
      var result = await product.findAll({
        where: {
          [Op.or]: [
            { PROD_CATEGORY: { [Op.like]: '%' + keyword + '%' } },
            { PROD_GENDER: { [Op.like]: '%' + keyword + '%' } },
            { PROD_SIZE: { [Op.like]: '%' + keyword + '%' } }
          ]
        }
      })

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    }
  },
  async addProduct(req, res) {
    try {
       const Product = {
          PROD_CATEGORY: req.body.PROD_CATEGORY,
          PROD_GENDER: req.body.PROD_GENDER,
          PROD_SIZE: req.body.PROD_SIZE,
          PROD_PRICE: req.body.PROD_PRICE,
          PROD_QUANTITY: req.body.PROD_QUANTITY,
        };
      
      var result = await product.create(Product);
      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    }
  },
  async findAllProducts(req, res) {
    try {
      var result = await product.findAll();

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    }
  },
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      var result = await product.update(req.body, {
        where: {
          PROD_ID: id
        }
      })
      if (result == 1) {
        res.send({
          message: `Update success!`,
          result
        });
      } else {
        res.send({
          message: `Cannot update product with id=${id}. Maybe product was not found`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating product with id=" + id
      });
    }
  },
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;

      var result = await product.destroy({
        where: {
          PROD_ID: id
        }
      })



      if (result == 1) {
        res.send({
          message: "elder was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete elder with id=${id}. Maybe elder was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete elder with id=" + id
      });
    }
  }

}

module.exports = productController;