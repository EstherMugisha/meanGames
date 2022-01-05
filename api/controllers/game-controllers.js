const mongoose = require("mongoose");
const Game=mongoose.model("Game");

function gamesGetAll(req,res){
    var offset= 0;
    var count= 5;
    const maxCount=9;
    if (req.query && req.query.offset) {
    offset= parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
    count= parseInt(req.query.count, 10);
    }

    if(isNaN(offset)||isNaN(count)){
        res.status(400).json({"message": "QueryString Offset and Count should be numbers"});
        return;
    }

    if (count > maxCount) {
        res.status(400).json({"message": "Cannot exceed count of "+ maxCount});
        return;
    }

    Game.find().skip(offset).limit(count).exec(function(err, games) {
        if(err){
            console.log("Error finding games");
            res.status(500).json(err);
        }
        else{
            console.log("Found games", games.length);
            res.json(games);
        }
    });
 }

 function gamesGetOne(req,res){
     const gameId=req.params.gameId;
     Game.findById(gameId).exec(function(err,game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
            return;
        }

        else if(!game){
                console.log("Game with ID "+gameId+" does not exist");
                res.status(400).json({"message": "game with provided Id does not exist "});
                return;
            }
            console.log("Found game");
            res.status(200).json(game);
        }
     )
 }

 function gamesAddOne(req,res){
    Game.create({title:req.body.title, year: parseInt(req.body.year), rate: parseInt(req.body.rate), 
    price: parseFloat(req.body.price), minPlayers: parseFloat(req.body.minPlayers), designers: req.body.designers }, function(err,game){
        if(err){
            console.log("Error creating game");
            res.status(400).json(err);
        }else{
            console.log("Game Created", game);
            res.status(200).json(game);
        }
    })     
 }

 function gamesDeleteOne(req,res){
    const gameId=req.params.gameId; 
    Game.findByIdAndRemove(gameId).exec(function(err,deletedGame){
        if (err){
            console.log("Error finding game");
            res.status(500).json({"message": "game with provided Id does not exist "});
            return;
        }
        else if(!deletedGame){
           console.log("game with ID "+gameId+" does not exist");
           res.status(400).json({"message": "game with provided Id does not exist "});
           return;
        }
        else{
          res.status(204).json(res.message)  
        }
    })
}

function gamesUpdateOne(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).exec(function(err,game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
        }else if(!game){
            res.status(404).json({"message":"Game Id not found"});
        }else{
            game.title=req.body.title; game.year=parseInt(req.body.year); game.price=parseFloat(req.body.price);
            game.designer=req.body.designer; game.minPlayers=parseInt(req.body.minPlayers);game.maxPlayers=parseInt(req.body.maxPlayers);
            game.rate=parseFloat(req.body.rate); game.minAge=parseInt(req.body.minAge);
            game.save(function(err,updatedGame){
                if(err){
                    res.status(500).json(err);
                }
                res.status(204).json(updatedGame)
            })
        }
    })
}

 module.exports={
     gamesGetAll: gamesGetAll,
     gamesGetOne: gamesGetOne,
     gamesAddOne:gamesAddOne,
     gamesDeleteOne:gamesDeleteOne,
     gamesUpdateOne:gamesUpdateOne
     
 }