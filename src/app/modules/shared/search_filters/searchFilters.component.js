(function() {
  'use strict';

  angular
    .module('searchFilters')
    .component('searchFilters', {
      bindings: {
        filters: '<',
        searchfn: '&'
      },
      templateUrl: 'app/modules/shared/search_filters/filters.html',
      controller: 'SearchFiltersController'
    })
    .controller('SearchFiltersController', function($scope) {
      var controller = this;

      this.update = function(filter) {

        var count = 0;

        for (var val in filter.selectedValue) {
          if (filter.selectedValue[val]) {
            count++;
          }
        }

        if (count == 0) {
          filter.selectedString = filter.noSelectionString;
        }
        else {
          filter.selectedString = count + " selected";
        }

        this.search();
      };

      this.search = function() {
        this.searchfn();
      };

      $scope.$on("slideEnded", function() {
        controller.search()
      });
    });
})();
