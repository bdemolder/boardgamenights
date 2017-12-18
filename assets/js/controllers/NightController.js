bgnwebapp.controller('NightController', ['$scope', '$rootScope', '$location', 'CalendarService', function($scope, $rootScope, $location, CalendarService) {
  $scope.master = {};
  $scope.complexities = [
    'Light - ideal for absolute beginners',
    'Light to Medium - still great for absolute beginners',
    'Medium - gamers or beginners who love a challenge',
    'Medium to Heavy - seasoned gamers',
    'Heavy - only recommended for hard core gamers'
  ];

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
  $scope.reset();

  $scope.today = function() {
    $scope.date = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.date = null;
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