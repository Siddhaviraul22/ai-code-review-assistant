const pool = require("../config/db");

const saveCode = async (req, res) => {

    try {

        const { id } = req.params;

        const { code } = req.body;

        const result = await pool.query(

            `UPDATE projects

             SET code=$1

             WHERE id=$2

             AND user_id=$3

             RETURNING *`,

            [

                code,

                id,

                req.user.id,

            ]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Project not found",

            });

        }

        res.status(200).json({

            message: "Code saved successfully",

            project: result.rows[0],

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Internal Server Error",

        });

    }

};

const getCode = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(

            `SELECT code

             FROM projects

             WHERE id=$1

             AND user_id=$2`,

            [

                id,

                req.user.id,

            ]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Project not found",

            });

        }

        res.json(result.rows[0]);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Internal Server Error",

        });

    }

};

module.exports = {

    saveCode,

    getCode,

};