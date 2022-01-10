//Modules and Server Properties

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const fs = require('fs');
const pug = require('pug');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const app = express();
const port = 80;
mongoose.connect("mongodb://localhost/loginnregi");


//Directories

//-Static

app.use('/static', express.static('static'));

//--Views

app.set('views', path.join(__dirname,'views'));

//--Pug

app.set('view engine', 'pug');

//Unloaded

app.set(express.urlencoded());

//Mongoose data

//--Schema

const loginSchema = new mongoose.Schema({
    email: String,
    password: String
})

//--Model

const login = mongoose.model('kitten', loginSchema);

//Endpoints

app.get("/",(req,res)=>{
    res.status(200).render("login.pug");
});

app.post("/", (req,res)=>{
    var clientData = new login(req.body);
    clientData.save().then(()=>{
        res.status(200).render("afterlogin.pug");
    }).catch(()=>{
        res.status(400).send("Error");
    })
})



//Listen

app.listen(port, ()=>{
    console.log("Server Started");
})



