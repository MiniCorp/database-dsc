(function () {
  'use strict';

  angular.module('home')
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
    .component('home', {
      templateUrl: 'app/modules/home/home.html',
      controller: 'HomeController'
    })
    .controller('HomeController', function ($scope, $location, $interval, searchCompaniesService, searchInvestorsService, searchHubsService, searchMultinationalsService) {
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
           case 'Irish': $location.path('/company/' + selectedOption['id'])
           break;

           case 'Investors': $location.path('/investor/' + selectedOption['id'])
           break;

           case 'International': $location.path('/mtns/' + selectedOption['id'])
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

      function getAllResults() {
        return {
          currentPage: 1,
          perPage: 1000
        }
      }

      controller.availableOptions = [];

      this.gatherRecentlyFundedCompanies = function() {
        searchCompaniesService.getCompanies({ recently_funded: true }, getAllResults()).then(function(companies) {
          controller.recentlyFunded = companies.data;
        });
      };

      this.gatherCompanies = function() {
        searchCompaniesService.getCompanies({ recently_funded: false }, getAllResults()).then(function(companies) {
          controller.companyResults = companies.data;
          controller.totalCompanyItems = companies.headers('Total')

          angular.forEach(companies.data, function(company){
            controller.availableOptions.push({name: company.name, itemType: 'Irish', id: company.id});
          });
        });
      };

      this.gatherMtns = function() {
        searchMultinationalsService.get({searchText: controller.query}, getAllResults()).then(function(multinationals) {
          controller.mtnsResults = multinationals.data;
          controller.totalMtnsItems = multinationals.headers('Total');

          angular.forEach(multinationals.data, function(multinational){
            controller.availableOptions.push({name: multinational.name, itemType: 'International', id: multinational.id});
          });
        })
      }

      this.gatherInvestors = function() {
        searchInvestorsService.get({searchText: this.query}, getAllResults()).then(function(investors) {
          controller.investorResults = investors.data;
          controller.totalInvestorItems = investors.headers('Total');

          angular.forEach(investors.data, function(investor){
            controller.availableOptions.push({name: investor.name, itemType: 'Investors', id: investor.id});
          });
        });
      };

      this.gatherHubs = function() {
        searchHubsService.get({searchText: controller.query}, getAllResults()).then(function(hubs) {
          controller.hubResults = hubs.data;
          controller.totalHubItems = hubs.headers('Total');

          angular.forEach(hubs.data, function(hub){
            controller.availableOptions.push({name: hub.name, itemType: 'Hubs', id: hub.id});
          });
        })
      }



    });
})();
