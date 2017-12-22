bgnwebapp.controller('HomeController', ['$scope', '$rootScope', '$location', 'AuthenticationService', function($scope, $rootScope, $location, AuthenticationService) {
  $scope.getFirstName = function () {
    if (AuthenticationService.isUserAuthenticated() && $rootScope.user.fullName) {
      return AuthenticationService.getUser().fullName;
    } 
    return "Guest";
  }

  $scope.isUserAuthenticated = function () {
    return AuthenticationService.isUserAuthenticated();
  }
}]);