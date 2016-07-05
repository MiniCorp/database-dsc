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
    .controller('HomeController', function ($rootScope, $scope, $location, $interval, searchCompaniesService, searchInvestorsService, searchHubsService, searchMultinationalsService, homeSearchService) {
      var controller = this;
      this.searchCompaniesService = searchCompaniesService;
      this.homeSearchService = homeSearchService;
      $rootScope.title = "Tech Ireland | Search for Irish Innovation Here";

      controller.currentPage = 1;
      controller.perPage = 4;
      this.query = "";

      $scope.$watch('currentPage', function () {
        controller.gatherRecentlyFundedCompanies();
        controller.gatherCompanies();
        controller.gatherMtns();
        controller.gatherInvestors();
        controller.gatherHubs();
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

      controller.availableOptions = [];

      this.getData = function(searchText) {
        return homeSearchService.getData(searchText).then(function(response) {
          return response.data;
        });
      };

      this.onSearchItemSelected = function($item) {
        if ($item == undefined) {
          return;
        }

        switch ($item.itemtype)
        {
           case 'Irish': $location.path('/company/' + $item.id)
           break;

           case 'Investors': $location.path('/investor/' + $item.id)
           break;

           case 'International': $location.path('/mtns/' + $item.id)
           break;

           case 'Hubs': $location.path('/hub/' + $item.id)
           break;
        }
      };

      this.gatherRecentlyFundedCompanies = function() {
        searchCompaniesService.getCompanies({ recently_funded: true }).then(function(companies) {
          controller.recentlyFunded = companies.data;
        });
      };

      this.gatherCompanies = function() {
        searchCompaniesService.getCompanies({ recently_funded: false }).then(function(companies) {
          controller.companyResults = companies.data;
          controller.totalCompanyItems = companies.headers('Total')
        });
      };

      this.gatherMtns = function() {
        searchMultinationalsService.get({searchText: controller.query}).then(function(multinationals) {
          controller.mtnsResults = multinationals.data;
          controller.totalMtnsItems = multinationals.headers('Total');
        })
      }

      this.gatherInvestors = function() {
        searchInvestorsService.get({searchText: this.query}).then(function(investors) {
          controller.investorResults = investors.data;
          controller.totalInvestorItems = investors.headers('Total');
        });
      };

      this.gatherHubs = function() {
        searchHubsService.get({searchText: controller.query}).then(function(hubs) {
          controller.hubResults = hubs.data;
          controller.totalHubItems = hubs.headers('Total');

          angular.forEach(hubs.data, function(hub){
            controller.availableOptions.push({name: hub.name, itemType: 'Hubs', id: hub.id});
          });
        })
      }
    });
})();
