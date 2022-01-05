const mongoose = require("mongoose");
require("dotenv").config({"path":".env"})
require("./games-model");
const dbURL = "mongodb://localhost:27017/meangames";
//const dbURL = process.env.dbURL+process.env.database;

mongoose.connect(dbURL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to "+ dbURL);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected to ");
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error "+ err);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termonation");
        process.exit(0);
    })
})

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termonation");
        process.exit(0);
    })
})
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termonation");
        process.kill(process.pid,"SIGUSR2");
    })
})