bgnwebapp.controller('NightController', ['$scope', '$rootScope', '$location', '$routeParams', 'CalendarService', function($scope, $rootScope, $location, $routeParams, CalendarService) {
  $scope.master = {};
  $scope.complexities = [
    'Light - ideal for absolute beginners',
    'Light to Medium - still great for absolute beginners',
    'Medium - gamers or beginners who love a challenge',
    'Medium to Heavy - seasoned gamers',
    'Heavy - only recommended for hard core gamers'
  ];

  var id = $routeParams.id;

  if (id) {
    CalendarService.getBoardGameNight(id).then(function(response) {
      $scope.master = response.data;
      $scope.master.dateTime = new Date(response.data.dateTime);
      $scope.reset();
    });
  }

  $scope.getEnumerator = function(value) {
    return new Array(value);   
  };

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.update = function(boardgamenight) {
    $scope.master = angular.copy(boardgamenight);
  };

  $scope.reset = function() {
    $scope.boardgamenight = angular.copy($scope.master);
  };

  $scope.today = function() {
    $scope.boardgamenight.dateTime = new Date();
  };

  $scope.clear = function() {
    $scope.boardgamenight.dateTime = null;
  };

  $scope.datePopup = {
    opened: false
  };

  $scope.dateOptions = {
    dateDisabled: false,
    formatYear: 'yy',
    minDate: new Date(),
    startingDay: 1
  };

  $scope.openDatePicker = function() {
    $scope.datePopup.opened = true;
  };
}]);