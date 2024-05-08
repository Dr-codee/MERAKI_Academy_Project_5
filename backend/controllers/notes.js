const pool = require("../models/db");
const createNotesByProviderId = (req, res) => {
    const provider_id = req.token.userId
    
    const { users_id , notes } = req.body;

    pool.query(`INSERT INTO notes (users_id,notes,provider_id) VALUES ($1,$2,$3) RETURNING * `, [users_id,notes,provider_id])

        .then((result) => {
            res.status(201).json({
                success: true,
                message: `notes created successfully`,
                review: result.rows,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });

};

// it views the notes for the user id (WHERE notes.users_id=$1)that was written by the provider id(users.users_id=notes.provider_id)

const getNotesByUserId = (req, res) => {
    const user_id = req.params.id

    pool.query(`SELECT notes FROM users INNER JOIN notes ON users.users_id=notes.provider_id WHERE notes.users_id=$1   `, [user_id])


    .then((result) => {
        if (result.rows.length !== 0) {
          res.status(200).json({
            success: true,
            message: `all notes for the user with id: ${user_id}`,
            result: result.rows,
          });
        } else {
          throw new Error("Error happened while getting article");
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
    createNotesByProviderId,
    getNotesByUserId

}