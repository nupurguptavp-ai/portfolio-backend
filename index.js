const express = require('express');
const cors = require('cors');
require("dotenv").config();

const projectRoutes = require("./src/routes/projectRoutes")

const app = express();

app.use(cors());

app.use(express.json());

app.use("/projects", projectRoutes)

// app.get("/projects", async (req, res) => {
//     const result = await pool.query('SELECT * FROM projects ORDER BY id DESC');
//     res.json(result.rows);
// })

app.get("/health", (req, res) => {
    res.send("Portfolio backend running on AWS 🚀")
})

app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000")
})