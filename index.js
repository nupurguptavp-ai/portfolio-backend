const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get("/health",(req,res)=>{
    res.send("Portfolio backend running on AWS 🚀")
})

app.listen(3000, '0.0.0.0', ()=>{
    console.log("Server running on port 3000")
})