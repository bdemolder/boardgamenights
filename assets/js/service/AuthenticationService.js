bgnwebapp.service('AuthenticationService', ['$http', '$rootScope', '$q', '$location', function($http, $rootScope, $q, $location) {
  return {
    logout: function () {
      var defer = $q.defer();

      $http.get('api/logout').then(function(resp) {
        $rootScope.user = undefined;
        defer.resolve(resp);
      }, function(err) {
        defer.reject(err);
      });
    },
    isUserAuthenticated: function () {
      return $rootScope.user !== undefined;
    },
    retrieveUserInfo: function () {
      var defer = $q.defer();

      if ($rootScope.user) {
        defer.resolve($rootScope.user);
      }

      $http.get('api/currentUser').then(function(resp) {
        if (resp.data.user) {
          $rootScope.user = resp.data.user;
          defer.resolve($rootScope.user);
        } else {
          defer.resolve(undefined);
        }
      }, function(err) {
        defer.reject(err);
      });

      return defer.promise;
    },
    getUser: function () {
      return $rootScope.user;
    }
  }
}]);