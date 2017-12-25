var INTEGER_REGEXP = /^-?\d+$/;
bgnwebapp.directive('complexity', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.complexity = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return false;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          var intValue = parseInt(viewValue);
          
          return intValue > 0 && intValue <= 5;
        }

        // it is invalid
        return false;
      };
    }
  };
});