const pool = require('../db/db');

const getProjects = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");
        res.json(result.rows)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error" })
    }
};

const createProject = async (req, res) => {
    try {
        const { title, description, github_link, user_id } = req.body;

        const result = await pool.query(
            `INSERT INTO projects(title, description, github_link, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, description, github_link, user_id]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error("GET PROJECTS ERROR:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

const updateProject = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }
        const result = await pool.query(
            `UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *`, [title, description, id]
        )
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE FROM projects WHERE id = $1`, [id]
        )
        res.json({ message: "Project Deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}
module.exports = { getProjects, createProject, updateProject, deleteProject };