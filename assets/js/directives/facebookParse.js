bgnwebapp.directive("facebookParse", function($rootScope) {
  return function (scope, iElement, iAttrs) {
    (function(d) {
      if ($rootScope.isFaceBookSDKLoaded) {
        FB.XFBML.parse();
      }
    })(document);
  };
});