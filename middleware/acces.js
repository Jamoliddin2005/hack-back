const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_key = process.env.SECRET_KEY || "";

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ msg: "Token must be provided" });

  jwt.verify(token, jwt_key, (err, decoded) => {
    if (err) { 
      res.status(400).json({ msg: "Token is not valid" });
    } else {
      next();
    }
  });
};
