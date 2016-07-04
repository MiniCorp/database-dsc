(function() {
  "use strict";
  angular
    .module('user')
    .directive('userHeaderText', function() {
      return {
        restrict: 'E',
        scope: {
          entity: "@"
        },
        templateUrl: 'app/modules/user/shared/userHeaderText.html'
      }
    });
})();
