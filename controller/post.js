const { db } = require("../models/index.js");

const Patient = db.patients

const addPatient = async (req,res) =>{
    try {
        let dataInfo = {
            registration_no: req.body.registration_no,
            name: req.body.name,
            mobile: req.body.mobile,
            disease: req.body.disease,
            age: req.body.age,
            gender: req.body.gender,
            city: req.body.city
        }
        const addData = await Patient.create(dataInfo)
        res.status(200).send(addData);
    } catch (error) {
            error.errors.map((e) => res.send(e.message));
            console.log("Error", error);
    }
}

module.exports = {addPatient}