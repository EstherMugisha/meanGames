angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesFactory){
    const vm=this;
    vm.title="GAMES";
    GamesFactory.getAllGames().then(function(response){
        console.log(response)
        vm.games=response;
    })
}