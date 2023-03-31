const jwt = require("jsonwebtoken");
const verifyjwt = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json("Unauthorize user");
  try {
    console.log(token)
   var newtoken = token.slice(7)
  // console.log(token)
    const decoded = jwt.verify(newtoken, "thisisjwttokenforlogin");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json("Token not valid");
  }
};

module.exports = verifyjwt;
