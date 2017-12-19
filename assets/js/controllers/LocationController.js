bgnwebapp.controller('LocationController', ['$scope', '$rootScope', '$location', 'NgMap', 'GeoCoder', '$log', function($scope, $rootScope, $location, NgMap, GeoCoder, $log) {
  var $ctrl = this;
  $ctrl.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzx-W7fI8repNJdr8URtDHW2OIWVUtmoE";

  $ctrl.$onInit = function () {
    $ctrl.boardgamenight = $ctrl.resolve.boardgamenight;

    NgMap.getMap().then(function (map) {
      var address = $ctrl.boardgamenight.city + ', ' + $ctrl.boardgamenight.street;

      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);

      NgMap.getGeoLocation(address).then(
        function (result) {
          map.setCenter(result);
          var marker = new google.maps.Marker({
            map: map,
            position: result
          });
        },
        function (result) {
          $log.warn('Could not find address: ' + address);
        },
      );
    });
  };
}]);