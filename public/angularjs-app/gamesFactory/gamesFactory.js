angular.module("meanGames").factory("GamesFactory", GamesFactory)

function GamesFactory($http) {
    return {
        getAllGames: getAll,
        getOneGame: getOne
    };
    function getAll() {
        return $http.get("/api/games").then(complete).catch(failed)
    }

    function getOne(id) {
        return $http.get("/api/games/"+id).then(complete).catch(failed)
    }
    function complete(response) {
        console.log(response.data)
        return response.data

    }
    function failed(error) {
        return error
    }
}
