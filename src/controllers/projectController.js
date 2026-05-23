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

module.exports = { getProjects };