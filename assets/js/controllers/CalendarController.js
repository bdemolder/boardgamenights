bgnwebapp.controller('CalendarController', ['$scope', '$rootScope', '$location', '$uibModal', '$log', 'toaster', 'CalendarService', 'AuthenticationService', function($scope, $rootScope, $location, $uibModal, $log, toaster, CalendarService, AuthenticationService) {
  $scope.calendar = [];

  $scope.alerts = [];

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

  $scope.isReadOnly = function () {
    return !AuthenticationService.isUserAuthenticated();
  }
  
  $scope.isOwner = function (boardgamenight) {
    var currentUser = AuthenticationService.getUser();
    return AuthenticationService.isUserAuthenticated() && boardgamenight.organisator.id === currentUser.id;
  };

  $scope.canJoin = function (boardgamenight) {
    var currentUser = AuthenticationService.getUser();
    var playersMatching = boardgamenight.players.filter(function (player) { return player.id === currentUser.id });

    return AuthenticationService.isUserAuthenticated() && 
      boardgamenight.organisator.id !== currentUser.id && 
      boardgamenight.players.length < boardgamenight.availablePlayerCount &&
      playersMatching.length === 0;
  };

  $scope.canLeave = function (boardgamenight) {
    var currentUser = AuthenticationService.getUser();
    var playersMatching = boardgamenight.players.filter(function (player) { return player.id === currentUser.id });

    return AuthenticationService.isUserAuthenticated() && 
      boardgamenight.organisator.id !== currentUser.id && 
      playersMatching.length > 0;
  };

  $scope.leave = function (boardgamenight) {
    CalendarService.leaveBoardGameNight(boardgamenight)
      .then(function(response) {
        initCalendar();
      })
      .catch(function(error) {
        toaster.pop('warning', "Can't join table:", error.data, 5000);
      });
  }

  $scope.join = function (boardgamenight) {
    CalendarService.joinBoardGameNight(boardgamenight)
      .then(function(response) {
        initCalendar();
      })
      .catch(function(error) {
        toaster.pop('warning', "Can't join table:", error.data, 5000);
      });
  }

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

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}]);