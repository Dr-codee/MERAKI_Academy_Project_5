const pool = require("../models/db");

const createDocInfoByProviderId = async (req, res) => {
  const { specialty, experience, certificates } = req.body;
  const provider_id = req.token.userId;
  pool
    .query(
      `INSERT INTO docInfo (specialty,experience,certificates,provider_id) VALUES ($1,$2,$3,$4)`,
      [specialty, experience, certificates, provider_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "docInfo created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "docInfo created failed",
        err,
      });
    });
};

const getDocInfoByProviderId = async (req, res) => {
  const provider_id = req.token.userId;
  pool
    .query(`SELECT * FROM docInfo  WHERE provider_id = $1 .is_deleted=0`, [
      provider_id,
    ])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "docInfo ",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateDocInfoByProviderId = (req, res) => {
  const provider_id = req.token.userId;
  let { experience, certificates } = req.body;
  pool
    .query(
      `UPDATE docInfo SET experience = COALESCE($1,experience), certificates = COALESCE($2, experience) WHERE provider_id=$3 AND is_deleted = 0  RETURNING *`,
      [experience || null, certificates || null, provider_id]
    )
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Article with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating article");
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

const deleteDocInfoByProviderId = (req, res) => {
  const provider_id = req.token.userId;
 
  pool
    .query(`delete from docInfo where provider_id = $1;`, [provider_id])
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `Article with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting article");
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
  createDocInfoByProviderId,
  getDocInfoByProviderId,
  updateDocInfoByProviderId,
  deleteDocInfoByProviderId,
};