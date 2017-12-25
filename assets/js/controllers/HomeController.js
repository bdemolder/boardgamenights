bgnwebapp.controller('HomeController', ['$scope', '$rootScope', '$location', 'AuthenticationService', function($scope, $rootScope, $location, AuthenticationService) {
  $scope.getFirstName = function () {
    if ($rootScope.user && $rootScope.user.fullName) {
      return $rootScope.user.fullName;
    } 
    return "Guest";
  }

  $scope.isUserAuthenticated = function () {
    return AuthenticationService.isUserAuthenticated();
  }
}]);