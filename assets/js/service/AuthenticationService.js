bgnwebapp.service('AuthenticationService', function($http, $rootScope, $q, $location) {
  return {
    checkUser: function (user) {
      var _self = this;

      var defer = $q.defer();
      $http.put('api/checkUser', user).then(function(resp) {
        defer.resolve(resp);
      }, function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    watchLoginChange: function() {
      var _self = this;

      FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
          /*
            The user is already logged,
            is possible retrieve his personal info
          */
          _self.retrieveUserInfo();

          $http.defaults.headers.common.Authorization = 'Bearer ' + res.authResponse.accessToken;
          /*
            This is also the point where you should create a
            session for the current user.
            For this purpose you can use the data inside the
            res.authResponse object.
          */
        }
        else {
          /*
            The user is not logged to the app, or into Facebook:
            destroy the session on the server.
          */
          $location.path('/');
        }
      });

      FB.getLoginStatus(function(response) {
      });
    },
    retrieveUserInfo: function () {
      var _self = this;

      FB.api('/me', {
        fields: 'name, first_name, link'
      }, function(res) {
        _self.checkUser({
          user: {
            facebookId: res.id,
            fullName: res.name
          }
        }).then(function(response) {
          $rootScope.user = _self.user = response.data;
          $rootScope.user.isAuthenticated = true;
        });
      });

    },
    logout: function () {
      var _self = this;

      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = {};
        });
      });
    },
    isUserAuthenticated: function () {
      return $rootScope.user && $rootScope.user.isAuthenticated;
    },
    getUser: function () {
      return $rootScope.user;
    }
  }
});