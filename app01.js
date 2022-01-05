const express = require("express");
const path = require ("path");
require("dotenv").config({"path":".env"})
require("./api/data/db.js");
const routes = require('./api/routes')
var bodyParser = require('body-parser')

console.log(process.env.PORT);
const app=express();
//const port= process.env.PORT || 3000
app.set("port", 3000);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
})

app.use("/api",function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Methods","GET, POST,OPTIONS")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,content-type,Accept, authorization")
    next();
})

app.use("/node_modules",express.static(path.join(__dirname, "node_modules")));
app.use("/public",express.static(path.join(__dirname,"public")));

app.use("/api", routes)

var server = app.listen(app.get("port"),function(){
    const port=server.address().port;
    console.log("listening to port: "+port);
})