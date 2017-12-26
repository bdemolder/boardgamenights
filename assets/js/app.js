'use strict';

var bgnwebapp = angular.module('bgnwebapp', ['ngRoute', 'ui.bootstrap', 'ngMap', 'toaster', 'ngAnimate']);

bgnwebapp.run(['$rootScope', '$window', '$location', 'AuthenticationService', function($rootScope, $window, $location, AuthenticationService) {
  $rootScope.$on('$routeChangeStart', function (event, current, previous) {
    if (!current.$$route) {
      event.preventDefault();
      $location.path('/');
      return;
    }

    if (!AuthenticationService.isUserAuthenticated() && current.$$route.authenticationRequired) {  
      event.preventDefault();
      $location.path('/');
    }
  });
}]);

bgnwebapp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/pages/home.html', authenticationRequired: false })
    .when('/home', { templateUrl: '/pages/home.html', authenticationRequired: false })
    .when('/login', { templateUrl: '/pages/login.html', authenticationRequired: false })
    .when('/calendar', { templateUrl: '/pages/calendar.html', authenticationRequired: false })
    .when('/night', { templateUrl: '/pages/night.html', authenticationRequired: true })
    .when('/night/:id', { templateUrl: '/pages/night.html', authenticationRequired: true })
    .otherwise({ redirectTo: '/login' });
}]);

bgnwebapp.controller('MainController', ['$scope', '$rootScope', '$location', '$window', 'AuthenticationService', function($scope, $rootScope, $location, $window, AuthenticationService) {
  AuthenticationService.retrieveUserInfo().catch(function (error){

  });

  $scope.isUserAuthenticated = function () {
    return AuthenticationService.isUserAuthenticated();
  }

  $scope.getClass = function (path) {
    return ($location.path().substr(0, path.length) === path) ? 'active' : '';
  }

  $scope.getFullName = function () {
    if ($rootScope.user && $rootScope.user.fullName) {
      return $rootScope.user.fullName;
    } 
    return "Guest";
  }

  $scope.logout = function () {
    $window.location.href = '/api/logout';
  }
}]);