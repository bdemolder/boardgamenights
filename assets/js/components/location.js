bgnwebapp.component('location', {
  templateUrl: '/pages/location.html',
  controller: 'LocationController',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
});