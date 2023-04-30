const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../model/admin.js");
require("dotenv").config();

const jwt_key = process.env.SECRET_KEY || "";

module.exports.auth = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const adminProfile = await Admin.findOne();
    if (phone && password) {
      if (adminProfile) {
        if (adminProfile.phone == phone) {
          const ComparePassword = await bcrypt.compare(
            password,
            adminProfile.password
          );
          if (ComparePassword) {
            const user = await jwt.sign({ phone, password }, jwt_key, {
              expiresIn: "1d",
            });
            return res.status(200).send({ msg: "Success!", token: user });
          } else {
            return res.status(400).send({ msg: "Error!" });
          }
        } else {
          return res.status(400).send({ msg: "Error!" });
        }
      } else {
        const HashPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
          phone,
          password: HashPassword,
        });
        await newAdmin.save();
        return res.status(200).send({ msg: "Admin qo'shildi!" });
      }
    } else {
      return res.status(400).send({ msg: "To'liq kiriting!" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ msg: "Token must be provided" });

  jwt.verify(token, jwt_key, (err, decoded) => {
    if (err) { 
      res.status(400).json({ msg: "Token is not valid" });
    } else {
      res.status(200).json({ msg: "Succes", token: true });
    }
  });
};
