const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_signup = require("./user-registrationModel.js")(sequelize, DataTypes);
db.images = require("./image.model.js")(sequelize, DataTypes);
db.patients = require("./post.js")(sequelize, DataTypes);
db.patient_visite = require("./create.js")(sequelize, DataTypes);

db.patients.hasMany(db.patient_visite, {
  foreignKey: "patient_id",
  // as: "patient",
});
db.patient_visite.belongsTo(db.patients, {
  foreignKey: "patient_id",
  // as: "patient_visit",
});

db.sequelize.sync({ force: false });

module.exports = { db };
