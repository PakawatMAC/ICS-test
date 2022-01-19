const db = require("../models/db");
const product = db.product;
const category = db.category;
const size = db.size;
const gender = db.gender;
const Op = db.Sequelize.Op;



const productController = {
  
  async findProductsByKeyword(req, res) {
    const keyword = req.params.id;
    try {
      var result = await product.findAll({
        where: {
          [Op.or]: [
            { "$CATEGORY.CATE_NAME$": { [Op.like]: "%" + keyword + "%" } },
            { "$GENDER.GEN_NAME$": { [Op.like]: "%" + keyword + "%" } },
            { "$SIZE.SIZE_NAME$": { [Op.like]: "%" + keyword + "%" } },
            { PROD_PRICE: { [Op.like]: "%" + keyword + "%" } }
          ]
        },
        include: [
          {
            model: gender,
            as: "GENDER",
            attributes: ["GEN_NAME"]
            
          },{
            model: size,
            as: "SIZE",
            attributes: ["SIZE_NAME"]
          },{
            model: category,
            as: "CATEGORY",
            attributes: ["CATE_NAME"]
          }
        ]
      })

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    }
  },

  async findProductsWithLimit(req, res) {
    const limits = req.params.id;

    try {
      var result = await product.findAll({
        limit: parseInt(limits)
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
          GEN_ID: req.body.GEN_ID,
          SIZE_ID: req.body.SIZE_ID,
          CATE_ID: req.body.CATE_ID,
          PROD_PRICE: req.body.PROD_PRICE,
          PROD_QUANTITY: req.body.PROD_QUANTITY,
        };

        const sProd = await product.findAndCountAll({
          where: {
            GEN_ID: req.body.GEN_ID,
            SIZE_ID: req.body.SIZE_ID,
            CATE_ID: req.body.CATE_ID,
            PROD_PRICE: req.body.PROD_PRICE
          }
        })
        var result
      if (sProd.count > 0) {
        result = await product.update({
          PROD_QUANTITY: sProd.rows[0].dataValues.PROD_QUANTITY + Product.PROD_QUANTITY
        }, {
          where: {
            GEN_ID: req.body.GEN_ID,
            SIZE_ID: req.body.SIZE_ID,
            CATE_ID: req.body.CATE_ID
          }
        })
      } else {
        result = await product.create(Product);
      }
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
      var result = await product.findAll({
        include: [
          {
            model: gender,
            as: "GENDER",
            attributes: ["GEN_NAME"]
            
          },{
            model: size,
            as: "SIZE",
            attributes: ["SIZE_NAME"]
          },{
            model: category,
            as: "CATEGORY",
            attributes: ["CATE_NAME"]
          }
        ]
      });

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
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete product with id=${id}. Maybe product was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete product with id=" + id
      });
    }
  }

}

module.exports = productController;