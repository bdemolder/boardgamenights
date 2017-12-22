'use strict';

var bgnwebapp = angular.module('bgnwebapp', ['ngRoute', 'ui.bootstrap', 'ngMap']);

bgnwebapp.run(['$rootScope', '$window', '$location', 'AuthenticationService', function($rootScope, $window, $location, AuthenticationService) {
  $rootScope.user = {
    isAuhtenticated: false
  };
  $rootScope.isFaceBookSDKLoaded = false;

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({
      /*
        The app id of the web app;
        To register a new app visit Facebook App Dashboard
        ( https://developers.facebook.com/apps/ )
      */
      appId: '1959698590978981',

      /*
        Adding a Channel File improves the performance
        of the javascript SDK, by addressing issues
        with cross-domain communication in certain browsers.
      */
      channelUrl: '/pages/authentication/channel.html',

      /*
        Set if you want to check the authentication status
        at the start up of the app
      */
      status: true,

      /*
        Enable cookies to allow the server to access
        the session
      */
      cookie: true,

      /* Parse XFBML */
      xfbml: true,

      /* Graph API version */
      version: 'v2.11'
    });

    AuthenticationService.watchLoginChange();
    $rootScope.isFaceBookSDKLoaded = true;
  };

  $rootScope.$on('$routeChangeStart', function (event, current, previous) {
    if (!AuthenticationService.isUserAuthenticated() && current.$$route.authenticationRequired) {  
      event.preventDefault();
      $location.path('/');
    }
  });

  (function(d) {
    // load the Facebook javascript SDK
    var js,
    id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/sdk.js";

    ref.parentNode.insertBefore(js, ref);
  }(document));
}]);

bgnwebapp.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/pages/home.html', authenticationRequired: false })
    .when('/calendar', { templateUrl: '/pages/calendar.html', authenticationRequired: false })
    .when('/night', { templateUrl: '/pages/night.html', authenticationRequired: true })
    .when('/night/:id', { templateUrl: '/pages/night.html', authenticationRequired: true })
    .otherwise({ redirectTo: '/' });
});

bgnwebapp.controller('MainController', ['$scope', '$rootScope', '$location', 'AuthenticationService', function($scope, $rootScope, $location, AuthenticationService) {
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
    AuthenticationService.logout();
    $location.path('/');
  }
}]);