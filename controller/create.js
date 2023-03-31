const { db } = require("../models/index.js");
const sequelize = require('sequelize')
const { Op } = require("sequelize");

const PatientVisit = db.patient_visite;
const Patient = db.patients;

const addVisit = async (req, res) => {
  try {
    const data = await Patient.findAll({
      where: {
        [Op.and]: [
          {
            id: req.body.patient_id,
          },
          {
            registration_no: req.body.registration_no,
          },
        ],
      },
    });
    if (data.length > 0) {
      let dataInfo = {
        registration_no: req.body.registration_no,
        visit_date: req.body.visit_date,
        patient_id: req.body.patient_id,
      };
      const addVisitData = await PatientVisit.create(dataInfo);
      res.status(200).send(addVisitData);
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const findData = async (req, res) => {
  try {
    await Patient.findAll({
      include: [
        {
            model: PatientVisit,
            as: "patient"
        }
      ],
    }).then((response) => {
      res.status(200).json({
        success: true,
        data: response,
      });
      console.log(response, "hgjguhjyg")
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error, "er")
  }
};



module.exports = { addVisit, findData };
