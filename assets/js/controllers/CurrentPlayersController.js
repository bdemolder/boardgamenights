bgnwebapp.controller('CurrentPlayersController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.boardgamenight = $ctrl.resolve.boardgamenight;
  };

  $ctrl.getHostPlayerCountString = function () {
    var amount = $ctrl.boardgamenight.totalPlayerCount - $ctrl.boardgamenight.availablePlayerCount - 1;
    if (amount === 0) return '';
    return amount === 1 ? ' and 1 other.' : ' and ' + amount + ' others.'
  }
}]);