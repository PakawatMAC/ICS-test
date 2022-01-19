const db = require("../models/db");
const gender = db.gender;
const Op = db.Sequelize.Op;



const genderController = {
  
  async findGendersByKeyword(req, res) {
    const keyword = req.params.id;
    try {
      var result = await gender.findAll({
        where: {
          [Op.or]: [

            { GEN_NAME: { [Op.like]: "%" + keyword + "%" } }

          ]
        }
      })

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving genders."
      });
    }
  },

  async addGender(req, res) {
    try {
       const Gender = {

          GEN_NAME: req.body.GEN_NAME

        };
      
      var result = await gender.create(Gender);
      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving genders."
      });
    }
  },
  async findAllGenders(req, res) {
    try {
      var result = await gender.findAll();

      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving genders."
      });
    }
  },
  async updateGender(req, res) {
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

module.exports = genderController;