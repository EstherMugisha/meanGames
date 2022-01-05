angular.module("meanGames",['ngRoute']).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");

    $routeProvider.when("/", {
        templateUrl:"angularjs-app/home/welcome.html",
    }
    ).when("/games", {
        templateUrl:"angularjs-app/game-list/games.html",
        controller:"GamesController",
        controllerAs:"vm"
    }
    ).when("/game/:id", {
        templateUrl:"angularjs-app/game-one/game.html",
        controller:"GameController",
        controllerAs:"vm"
    }).otherwise({
        redirectTo: '/'
    })
}