bgnwebapp.controller('CurrentPlayersController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.boardgamenight = $ctrl.resolve.boardgamenight;
  };

  $scope.getHostPlayerCountString = function () {
    var amount = $ctrl.boardgamenight.totalPlayerCount - $ctrl.boardgamenight.availablePlayerCount - 1;

    return amount === 1 ? '1 other.' : amount + ' others.'
  }
}]);