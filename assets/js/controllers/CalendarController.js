bgnwebapp.controller('CalendarController', ['$scope', '$rootScope', '$location', 'CalendarService', function($scope, $rootScope, $location, CalendarService) {
  $scope.calendar = [];

  CalendarService.getCalendar().then(function(response) {
    $scope.calendar = response.data;
  });

  $scope.getEnumerator = function(value) {
    return new Array(value);   
  };

  $scope.getBoardGameNightFullClass = function(boardgamenight) {
    if (boardgamenight.players.length === boardgamenight.availablePlayerCount) {
      return "danger";
    }
  };

  $scope.isOwner = function (boardgamenight) {
    return boardgamenight.organisator.id === "fd0b9c8f-98b2-439c-b2fb-56145eebca8a";
  };

  $scope.canSignUp = function (boardgamenight) {
    return boardgamenight.organisator.id !== "fd0b9c8f-98b2-439c-b2fb-56145eebca8a" && 
      boardgamenight.players.length < boardgamenight.availablePlayerCount;
  };

  $scope.modify = function (boardgamenight) {
    $location.path( "/night/" + boardgamenight.id );
  }

  $scope.go = function ( path ) {
    $location.path( path );
  };
}]);