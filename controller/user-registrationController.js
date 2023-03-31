const { db } = require("../models/index.js");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const UserSignup = db.user_signup;

const userSignUp = async (req, res) => {
  try {
    var email = await UserSignup.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (email) {
      return res.status(400).send({
        message: "Failed! Email is already Exist!",
      });
    }
    const info = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    if (info.password) {
      const salt = bcrypt.genSaltSync(10, "a");
      info.password = bcrypt.hashSync(info.password, salt);
    }
    var data = await UserSignup.create(info);
    res.status(200).send(data);
  } catch (error) {
    error.errors.map((e) => res.send(e.message));
    console.log("Error", error);
  }
};

const emailVerify = async (req, res) => {
  try {
    var email = await UserSignup.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!email) {
      return res.status(400).send({
        message: "Failed! Email is not Exist!",
      });
    } else {
      return res.status(400).send({
        message: "Success! Email is Verified!",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const loginUser = async (req, res) => {
  const user = await UserSignup.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    const isMatched = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (isMatched) {
      const token = jwt.sign({ user }, "thisisjwttokenforlogin", {
        expiresIn: "2 days",
      });
      req.session.user = user;
      req.session.save();
      return res.send({message:"Your are logged in",
      access_token: token,});
    }
  }
  return res.status(400).json({ message: "Invalid Credential" });
};

var getProfile = (req, res) => {
  if (req.session.user) {
   console.log(req.session.user.id,"11156661561")
    res.send("You visited this page for "
        + req.session.user.firstName + " times");
}
else {
    req.session.user = 1;
    res.send("You have visited this page"
       + " for first time ! Welcome....");
}

};

var demoUser = (req, res) => {
  const data = req.session.user.firstName +" " + req.session.user.lastName;
  console.log(data)
  res.status(200).send(data);
};

var searchData = async (req, res) => {
  //var result = req.query.id.split(',')
  const data = await UserSignup.findAll({
    // where: {
    //   // firstName: req.query.name,
    //   // email: req.query.email
    //   // id: {
    //   //   [Op.eq]: req.query.id
    //   // }
    //   [Op.or]: [
    //     {
    //       firstName: req.query.name
    //     },
    //     {
    //       email: req.query.email
    //     }
    //   ]
    // },

    where: { firstName: { [Op.like]: "%" + req.query.name } },
  });
  console.log(data, "search");
  //res.send(data);
  // http://localhost:8001/search?name=ravi
};

module.exports = {
  userSignUp,
  emailVerify,
  loginUser,
  getProfile,
  demoUser,
  searchData,
};
