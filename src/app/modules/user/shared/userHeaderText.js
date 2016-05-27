(function() {
  "use strict";
  angular
    .module('user')
    .directive('userHeaderText', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/modules/user/shared/userHeaderText.html'
      }
    });
})();
