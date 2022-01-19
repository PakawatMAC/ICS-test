const db = require("../models/db");
const size = db.size;
const Op = db.Sequelize.Op;



const sizeController = {
  
  async findSizesByKeyword(req, res) {
    const keyword = req.params.id;
    try {
      var result = await size.findAll({
        where: {
          [Op.or]: [

            { SIZE_NAME: { [Op.like]: "%" + keyword + "%" } }

          ]
        }
      })

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sizes."
      });
    }
  },

  async addSize(req, res) {
    try {
       const Size = {

          SIZE_NAME: req.body.SIZE_NAME

        };
      
      var result = await size.create(Size);
      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sizes."
      });
    }
  },
  async findAllSizes(req, res) {
    try {
      var result = await size.findAll();

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sizes."
      });
    }
  },
  async updateSize(req, res) {
    try {
      const id = req.params.id;
      var result = await size.update(req.body, {
        where: {
          SIZE_ID: id
        }
      })
      if (result == 1) {
        res.send({
          message: `Update success!`,
          result
        });
      } else {
        res.send({
          message: `Cannot update size with id=${id}. Maybe size was not found`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating size with id=" + id
      });
    }
  },
  async deleteSize(req, res) {
    try {
      const id = req.params.id;

      var result = await size.destroy({
        where: {
          SIZE_ID: id
        }
      })



      if (result == 1) {
        res.send({
          message: "Size was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete size with id=${id}. Maybe size was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete size with id=" + id
      });
    }
  }

}

module.exports = sizeController;