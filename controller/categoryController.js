const db = require("../models/db");
const category = db.category;
const Op = db.Sequelize.Op;



const categoryController = {
  
  async findCategorysByKeyword(req, res) {
    const keyword = req.params.id;
    try {
      var result = await category.findAll({
        where: {
          [Op.or]: [

            { CATE_NAME: { [Op.like]: keyword } }

          ]
        }
      })

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys."
      });
    }
  },

  async addCategory(req, res) {
    try {
       const Category = {

          CATE_NAME: req.body.CATE_NAME

        };
      
      var result = await category.create(Category);
      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys."
      });
    }
  },
  async findAllCategorys(req, res) {
    try {
      var result = await category.findAll();

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys."
      });
    }
  },
  async updateCategory(req, res) {
    try {
      const id = req.params.id;
      var result = await category.update(req.body, {
        where: {
          CATE_ID: id
        }
      })
      if (result == 1) {
        res.send({
          message: `Update success!`,
          result
        });
      } else {
        res.send({
          message: `Cannot update category with id=${id}. Maybe category was not found`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating category with id=" + id
      });
    }
  },
  async deleteCategory(req, res) {
    try {
      const id = req.params.id;

      var result = await category.destroy({
        where: {
          CATE_ID: id
        }
      })



      if (result == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete category with id=${id}. Maybe category was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete category with id=" + id
      });
    }
  }

}

module.exports = categoryController;