(function() {
  'use strict';

  angular
    .module('searchCompanies')
    .component('searchCompanies', {
      templateUrl: 'app/modules/entities/companies/index.html',
      controller: 'SearchCompaniesController'
    })
    .controller('SearchCompaniesController', function($rootScope, $scope, $stateParams, $location, $document, searchCompaniesService, filterCompaniesService) {
      var controller = this;
      this.searchCompaniesService = searchCompaniesService;
      this.filterCompaniesService = filterCompaniesService;
      $rootScope.title = "TechIreland | Companies";

      if ($stateParams.tag) {
        this.tag = $stateParams.tag;
      }

      // filter
      this.filters = filterCompaniesService.filtersData();

      function getSelectedFilter() {
        var obj = {};
        Object.keys(controller.filters).map(function(filterName) {
          obj[filterName] = controller.filters[filterName].selectedValue;
        });
        return obj;
      }

      // pagination
      $scope.currentPage = 1;
      $scope.perPage = 9;

      $scope.$watch('currentPage', function () {
        $document.scrollTopAnimated(0, 250);
        controller.search();
      }, true);

      function getPaginationDetails() {
        return {
          currentPage: $scope.currentPage,
          perPage: $scope.perPage
        }
      }

      this.resetSearch = function() {
        // reset the text search
        this.query = "";
        // reset 'tag' if exists
        this.tag = null;
        // reset all the filters
        Object.keys(controller.filters).map(function(filterName) {
          var filterObj = controller.filters[filterName];
          filterObj.selectedValue = "";
          switch (filterObj.type) {
            case "dropdown":
              $document[0].getElementById(filterObj.id).selectedIndex = 0;
              break;
            case "checklist":
              filterObj.selectedString = filterObj.noSelectionString;
              var checkboxes = $document[0].getElementsByName("filterCheckbox");
              for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
              }
              break;
            default:
          }
        });
        // re-query for data with cleared search params
        controller.search();
      }

      // search
      this.search = function() {
        var query = {};
        if (this.query != undefined) {
          query.searchText = this.query;
        }
        if (this.tag != undefined) {
          query.tag = this.tag;
        }

        searchCompaniesService.getCompanies(query, getSelectedFilter(), getPaginationDetails()).then(function(companies) {
          controller.results = companies.data;
          controller.totalItems = companies.headers('Total')
        });
      };
    });
})();
