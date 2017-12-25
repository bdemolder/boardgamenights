bgnwebapp.controller('LoginController', ['$scope', '$rootScope', '$window', 'AuthenticationService', function($scope, $rootScope, $window, AuthenticationService) {
  $scope.facebookLogin = function () {
    $window.location.href = '/api/auth/facebook';
  }
}]);