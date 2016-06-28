(function () {
  'use strict';

  angular.module('about')
    .filter('propsFilter', function() {
      return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
          var keys = Object.keys(props);

          items.forEach(function(item) {
            var itemMatches = false;

            for (var i = 0; i < keys.length; i++) {
              var prop = keys[i];
              var text = props[prop].toLowerCase();
              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                itemMatches = true;
                break;
              }
            }

            if (itemMatches) {
              out.push(item);
            }
          });
        } else {
          // Let the output be the input untouched
          out = items;
        }

        return out;
      };
    })
    .component('about', {
      templateUrl: 'app/modules/about/about.html',
      controller: 'AboutController'
    })
    .controller('AboutController', function ($scope, $location, $interval, searchCompaniesService, searchInvestorsService, searchHubsService, searchMultinationalsService) {
      var controller = this;
      this.searchCompaniesService = searchCompaniesService;

      controller.currentPage = 1;
      controller.perPage = 4;
      this.query = "";

      $scope.$watch('currentPage', function () {
        controller.gatherRecentlyFundedCompanies();
        controller.gatherCompanies();
        controller.gatherInvestors();
        controller.gatherHubs();
        controller.gatherMtns();
      }, true);

      $scope.$watch('$ctrl.availableOptions.selected', function (selectedOption) {

        if (selectedOption == undefined) {
          return;
        }

        switch (selectedOption['itemType'])
        {
           case 'Company': $location.path('/company/' + selectedOption['id'])
           break;

           case 'Investor': $location.path('/investor/' + selectedOption['id'])
           break;

           case 'Multinationals': $location.path('/mtns/' + selectedOption['id'])
           break;

           case 'Hubs': $location.path('/hub/' + selectedOption['id'])
           break;
        }
      });

      function getPaginationDetails() {
        return {
          currentPage: controller.currentPage,
          perPage: controller.perPage
        }
      }

      controller.availableOptions = [];

      this.gatherRecentlyFundedCompanies = function() {
        searchCompaniesService.getCompanies({ recently_funded: true }, getPaginationDetails()).then(function(companies) {
          controller.recentlyFunded = companies.data;
        });
      };

      this.gatherCompanies = function() {
        searchCompaniesService.getCompanies({ recently_funded: false }, getPaginationDetails()).then(function(companies) {
          controller.companyResults = companies.data;
          controller.totalCompanyItems = companies.headers('Total')

          angular.forEach(companies.data, function(company){
            controller.availableOptions.push({name: company.name, itemType: 'Irish', id: company.id});
          });
        });
      };

      this.gatherMtns = function() {
        searchMultinationalsService.get({searchText: controller.query}, getPaginationDetails()).then(function(multinationals) {
          controller.mtnsResults = multinationals.data;
          controller.totalMtnsItems = multinationals.headers('Total');

          angular.forEach(multinationals.data, function(multinational){
            controller.availableOptions.push({name: multinational.name, itemType: 'International', id: multinational.id});
          });
        })
      }

      this.gatherInvestors = function() {
        searchInvestorsService.get({searchText: this.query}, getPaginationDetails()).then(function(investors) {
          controller.investorResults = investors.data;
          controller.totalInvestorItems = investors.headers('Total');

          angular.forEach(investors.data, function(investor){
            controller.availableOptions.push({name: investor.name, itemType: 'Investors', id: investor.id});
          });
        });
      };

      this.gatherHubs = function() {
        searchHubsService.get({searchText: controller.query}, getPaginationDetails()).then(function(hubs) {
          controller.hubResults = hubs.data;
          controller.totalHubItems = hubs.headers('Total');

          angular.forEach(hubs.data, function(hub){
            controller.availableOptions.push({name: hub.name, itemType: 'Hubs', id: hub.id});
          });
        })
      }



    });
})();
