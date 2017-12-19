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
    },
    'getBoardGameNight': function(id) {
      var defer = $q.defer();
      $http.get('api/boardgamenight/' + id).then(function(resp) {
        defer.resolve(resp);
      }, function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addBoardGameNight': function(boardgamenight) {
      var defer = $q.defer();
      boardgamenight.organisator = 'fd0b9c8f-98b2-439c-b2fb-56145eebca8a';
      $http.post('api/boardgamenight', boardgamenight).then(function(resp) {
        defer.resolve(resp);
      }, function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'removeBoardGameNight': function(id) {
      var defer = $q.defer();
      $http.delete('api/boardgamenight/' + id).then(function(resp) {
        defer.resolve(resp);
      }, function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'modifyBoardGameNight': function(boardgamenight) {
      var defer = $q.defer();
      $http.put('api/boardgamenight/' + boardgamenight.id, boardgamenight).then(function(resp) {
        defer.resolve(resp);
      }, function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});