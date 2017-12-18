'use strict';

var bgnwebapp = angular.module('bgnwebapp', ['ngRoute', 'ui.bootstrap']);

bgnwebapp.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: '/pages/home.html'
    })
    .when('/calendar', {
      templateUrl: '/pages/calendar.html', 
      controller:  'CalendarController'
    })
    .when('/night', {
      templateUrl: '/pages/night.html', 
      controller:  'NightController'
    })
    .otherwise({ redirectTo: '/' });
});

bgnwebapp.controller('MainController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  $scope.getClass = function (path) {
    return ($location.path().substr(0, path.length) === path) ? 'active' : '';
  }
}]);