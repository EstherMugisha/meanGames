const Mongoose=require("mongoose");
const Game= Mongoose.model("Game");

function reviewsGetAll(req,res){
    const gameId=req.params.gameId;
        Game.findById(gameId).select("reviews").exec(function(err, game){
        if(err){
            res.status(500).json(err);
            return;
        }
        else{
            console.log(game.reviews);
            res.status(200).json(game.reviews)
        }
    })
}

function reviewsGetOne(req,res){
    const gameId=req.params.gameId;
    const reviewId=req.params.reviewId;
        Game.findById(gameId).select("reviews").exec(function(err, game){
        const review = game.reviews.id(reviewId)
        if(err){
            res.status(500).json(err);
            return;
        }
        else{
            res.status(200).json(review)
        }
    })
}

const _addReview=function(req,res,game){
    game.review=req.body;
    game.save(function(err,updatedGame){
        if(err){
            res.status(500).json(err);
        }else{
            res.status(201).json(updatedGame.review);
        }
    })
}

function reviewAdd(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).select("-publisher").exec(function(err,game){
        if(err){
            console.log("error finding game");
            res.status(500).json(err)
        }else if(!game){
            console.log("Game id not found");
            res.status(404).json({"message":"Game ID not found"+gameId});
        }
        if(game){
            _addReview(req,res,game);
        }
    })
}

const _updateReview=function(req,res,game){
    game.review.name=req.body.name;
    game.review.review=req.body.review;
    game.review.date=req.body.date;
    game.save(function(err,updatedGame){
        if(err){
            res.status(500).json(err);
        }
        res.status(204).json(response.message);
    })
}

function updateReview(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).select("-publisher").exec(function(err,game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
        }else if(!game){
            res.status(404).json({"message": "Game Id not found"});
        }
        else{
            _updateReview(req,res,game);
        }
    })
}

const _deleteReview = function(req,res,game){
    const reviewId=req.params.reviewId;
    game.reviews.id(reviewId).remove()
    game.save(function(err,game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
        }
        res.status(204).json(response.message)
    })
}

function reviewDelete(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).select("-reviews").exec(function(err,game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
        }else if(!game){
            res.status(404).json({"message":"Game not found"})
        }
        else{
            _deleteReview(req,res,game);
        }
    })
}

module.exports={
    reviewsGetAll:reviewsGetAll,
    reviewsGetOne:reviewsGetOne,
    reviewAddOne:reviewAdd,
    reviewUpdateOne:updateReview,
    reviewDelete:reviewDelete
}