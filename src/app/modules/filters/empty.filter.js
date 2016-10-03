(function() {
  'use strict';

  angular
    .module('dscFe')
    .filter('emptyFilter', function() {

      function hasWhiteSpace(s) {
        return /\s/g.test(s);
      }

      return function(array) {
        var filteredArray = [];
          angular.forEach(array, function(item) {
            if (item && !hasWhiteSpace(item)) {
              filteredArray.push(item);
            }
          });
        return filteredArray;
      };

    })
})();
