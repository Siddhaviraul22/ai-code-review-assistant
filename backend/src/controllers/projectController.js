const pool = require("../config/db");

// ---------------- CREATE PROJECT ----------------

const createProject = async (req, res) => {

    try {

        const { project_name } = req.body;

        if (!project_name) {

            return res.status(400).json({

                message: "Project name is required",

            });

        }

        const result = await pool.query(

            `INSERT INTO projects(user_id, project_name)
             VALUES($1,$2)
             RETURNING *`,

            [

                req.user.id,

                project_name,

            ]

        );

        return res.status(201).json({

            message: "Project created successfully",

            project: result.rows[0],

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error",

        });

    }

};

// ---------------- GET ALL PROJECTS ----------------

const getProjects = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT *
             FROM projects
             WHERE user_id=$1
             ORDER BY created_at DESC`,

            [

                req.user.id,

            ]

        );

        return res.status(200).json(

            result.rows

        );

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error",

        });

    }

};

// ---------------- UPDATE PROJECT ----------------

const updateProject = async (req, res) => {

    try {

        const { id } = req.params;

        const { project_name } = req.body;
        console.log("Request Body:", req.body);
console.log("Project Name:", project_name);
        if (!project_name) {
    return res.status(400).json({
        message: "Project name is required",
    });
}


        const result = await pool.query(

            `UPDATE projects

             SET project_name=$1

             WHERE id=$2

             AND user_id=$3

             RETURNING *`,

            [

                project_name,

                id,

                req.user.id,

            ]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Project not found",

            });

        }

        return res.status(200).json({

            message: "Project updated",

            project: result.rows[0],

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error",

        });

    }

};

// ---------------- DELETE PROJECT ----------------

const deleteProject = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(

            `DELETE FROM projects

             WHERE id=$1

             AND user_id=$2

             RETURNING *`,

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

        return res.status(200).json({

            message: "Project deleted successfully",

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error",

        });

    }

};

module.exports = {

    createProject,

    getProjects,

    updateProject,

    deleteProject,

};