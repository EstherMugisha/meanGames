const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:{
            type:String,
        },
        coordinates: [String]
    },
});

const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    review:{
        type:String,
        default:"good game"
    },
    date:{
        type:String,
    },
})

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    designers: [String],
    players: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    publisher: publisherSchema,
    reviews:reviewSchema,
});


mongoose.model("Game", gameSchema, "games");