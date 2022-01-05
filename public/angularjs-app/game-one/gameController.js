angular.module("meanGames").controller("GameController", GameController);

function GameController($routeParams, GamesFactory){
    const vm=this;
    const id=$routeParams.id; 
    GamesFactory.getOneGame(id).then(function(response){
        vm.game=response;
        vm.rating=_getStarRating(response.rate)
    }
        
    )

    function _getStarRating(stars){
        return new Array(stars);
    }
    
}