const { response } = require("express");
const Mongoose=require("mongoose");
const Game= Mongoose.model("Game");

function getPublisher(req,res){
    const gameId=req.params.gameId; 
    Game.findById(gameId).select("publisher").exec(function(err, game){
        if(err){
            console.log("error getting publisher")
            res.status(500).json(err);
            return;
        }else{
            console.log("Got the publisher");
            res.status(200).json(game.publisher);
        }
        
    })
}

const _addPublisher=function(req,res,game){
    game.publisher.name=req.body.name;
    game.publisher.location.coordinates=[parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err,updatedGame){
        if(err){
            res.status(500).json(err);
            return;
        }else{
              res.status(201).json(updatedGame.publisher);
        }
    })
}

function publisherAdd(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).select("-reviews").exec(function(err,game){
        if(err){
            console.log("error finding game");
            res.status(500).json(err);
            return;
        }else if(!game){
            console.log("Game id not found");
            res.status(404).json({"message":"Game ID not found"+gameId});
        }
        if(game){
            _addPublisher(req,res,game);
        }
    })
}
const _updatePublisher=function(req,res,game){
    game.publisher.name=req.body.name;
    game.publisher.location.coordinates=[parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err,updatedGame){
        if(err){
            res.status(500).json(err);
        }
        res.status(204).json(response.message);
    })
}

function updatePublisher(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).select("-reviews").exec(function(err,game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
        }else if(!game){
            res.status(404).json({"message": "Game Id not found"});
        }
        else{
            _updatePublisher(req,res,game);
        }
    })
}

const _deletePublisher = function(req,res,game){
    game.publisher.remove();
    game.save(function(err,game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
        }
        res.status(204).json(response.message)
    })
}

function publisherDelete(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).select("-reviews").exec(function(err,game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
        }else if(!game){
            res.status(404).json({"message":"Game not found"})
        }
        else{
            _deletePublisher(req,res,game);
        }
    })
}

module.exports={
    getPublisher: getPublisher,
    publisherAdd:publisherAdd,
    updatePublisher:updatePublisher,
    publisherDelete:publisherDelete
}