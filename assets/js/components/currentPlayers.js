bgnwebapp.component('currentPlayers', {
  templateUrl: '/pages/currentPlayers.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.boardgamenight = $ctrl.resolve.boardgamenight;
    };

    $ctrl.getHostPlayerCountString = function () {
      var amount = $ctrl.boardgamenight.totalPlayerCount - $ctrl.boardgamenight.availablePlayerCount - 1;

      return amount === 1 ? '1 other.' : amount + ' others.'
    }
  }
});