bgnwebapp.service('CalendarService', function($http, $q) {
  return {
    'getCalendar': function() {
      var defer = $q.defer();
      $http.get('api/calendar').then(function(resp) {
        defer.resolve(resp);
      }, function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});