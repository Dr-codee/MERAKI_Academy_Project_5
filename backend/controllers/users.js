const pool = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT);

const registerDoctor = async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    specialty,
    address,
    email,
    password,
    phone,
  } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const role_id = 2;
  pool
    .query(
      `INSERT INTO users (firstName, lastName, age, specialty, address, email, password, role_id, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        firstName,
        lastName,
        age,
        specialty,
        address,
        email.toLowerCase(),
        encryptedPassword,
        role_id,
        phone,
      ]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

const registerPatient = async (req, res) => {
  const { firstName, lastName, age, email, password, phone } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const role_id = 1;
  pool
    .query(
      `INSERT INTO users (firstName, lastName, age, email, password, role_id, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        firstName,
        lastName,
        age,
        email.toLowerCase(),
        encryptedPassword,
        role_id,
        phone,
      ]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].users_id,
              firstName: result.rows[0].firstName,
              role_id: result.rows[0].role_id,
              specialty: result.rows[0].specialty,
            };
            const options = { expiresIn: "1day" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId: result.rows[0].users_id,
                role_id: result.rows[0].role_id,
                specialty: result.rows[0].specialty,
                firstName: result.rows[0].firstName,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else {
        throw Error;
      }
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

const getuserinfo = (req, res) => {
  const users_id = req.token.userId;
  const query = `SELECT firstName, lastName, age, email, phone FROM users WHERE users_id= $1`;
  const data = [users_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The user info`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting review");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getUserByFirstName = (req, res) => {
  const firstname = req.query.firstname;
  const query = `SELECT * FROM users WHERE firstName = $1 AND role_id = 2`;
  const data = [firstname];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The doctor: ${firstname} does not exist`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `${firstname}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getProviderBySpecialty = (req, res) => {
  const specialty_id = req.params.id;

  const query = `SELECT * FROM users WHERE specialty= $1`;
  const data = [specialty_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The user info`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting review");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getProviderById = (req, res) => {
  const provider_id = req.params.id;
  const query = `SELECT * FROM users WHERE users_id= $1`;
  const data = [provider_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The user info`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting review");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  registerDoctor,
  registerPatient,
  login,
  getuserinfo,
  getProviderBySpecialty,
  getProviderById,
  getUserByFirstName,
};
