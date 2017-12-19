bgnwebapp.controller('CalendarController', ['$scope', '$rootScope', '$location', '$uibModal', '$log', 'CalendarService', function($scope, $rootScope, $location, $uibModal, $log, CalendarService) {
  $scope.calendar = [];

  function initCalendar() {
    CalendarService.getCalendar().then(function(response) {
      $scope.calendar = response.data;
    });
  };
  initCalendar();

  $scope.getEnumerator = function(value) {
    return new Array(value);   
  };

  $scope.getBoardGameNightFullClass = function(boardgamenight) {
    if (boardgamenight.players.length === boardgamenight.availablePlayerCount) {
      return "danger";
    }
  };

  var difficulties = {
    1: 'green',
    2: 'darkcyan',
    3: 'yellowgreen',
    4: 'orange',
    5: 'red'
  }
  $scope.getComplexityColorClass = function(boardgamenight) {
    return difficulties[boardgamenight.complexity];
  }

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

  $scope.delete = function (boardgamenight) {
    CalendarService.removeBoardGameNight(boardgamenight.id).then(function(response) {
      initCalendar();
    });
  }

  $scope.openCurrentPlayersModal = function (boardgamenight) {
    var modalInstance = $uibModal.open({
      animation: true,
      component: 'currentPlayers',
      resolve: {
        boardgamenight: function () {
          return boardgamenight;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openLocationModal = function (boardgamenight) {
    var modalInstance = $uibModal.open({
      animation: true,
      component: 'location',
      resolve: {
        boardgamenight: function () {
          return boardgamenight;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.go = function ( path ) {
    $location.path( path );
  };
}]);