bgnwebapp.component('currentPlayers', {
  templateUrl: '/pages/currentPlayers.html',
  controller: 'CurrentPlayersController',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
});