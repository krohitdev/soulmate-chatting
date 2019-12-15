require('dotenv').config()

const express = require("express"),
    app = express(),
    userRoutes = require('./routes/userRoutes');
   
app.use(express.json());

app.get("/", function(req,res){
    res.send("landing");
});

app.use("/api/v1/users", userRoutes)

module.exports = app;

