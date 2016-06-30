(function() {
  "use strict";

  angular
    .module('admin')
    .component('adminCompaniesEdit', {
      templateUrl: 'app/modules/admin/companies/companies.edit.html',
      controller: 'AdminCompaniesEditController'
    })
    .controller('AdminCompaniesEditController', function(store, $state, adminGetCompanyService, updateCompanyService, $stateParams, Notification, listTagsService, adminListInvestorsService, listHubsService) {
      var controller = this;
      this.tags = [];
      this.incubators = [];
      this.target_markets = {};

      function loadTags() {

        if (!controller.company.tags || angular.isFunction(controller.company.tags.forEach) == false) {
          controller.company.tags = [];
          return;
        }

        controller.company.tags.forEach(function(tag) {
          controller.tags.push({text: tag})
        });
      }

      function loadIncubators() {
        if (!controller.company.incubators || angular.isFunction(controller.company.incubators.forEach) == false) {
          controller.company.incubators = [];
          return;
        }

        controller.company.incubators.forEach(function(hub) {
          controller.hubs.push({text: hub})
        });
      }

      function loadTargetMarkets() {
        controller.company.target_markets.split(',').forEach(function(code) {
          controller.target_markets[code] = true
        });
      }

      function setFundingRounds() {
        if (!controller.company.funding_rounds || angular.isFunction(controller.company.funding_rounds.push) == false)
          controller.company.funding_rounds = [];
      }

      function setOfficeLocations() {
        if (!controller.company.office_locations || angular.isFunction(controller.company.office_locations.push) == false)
          controller.company.office_locations = [];
      }

      function setFounders() {
        if (!controller.company.founders || angular.isFunction(controller.company.founders.push) == false)
          controller.company.founders = [];
      }

      adminGetCompanyService.find($stateParams.id).then(function(company) {
        controller.company = company;
        setFundingRounds();
        setOfficeLocations();
        setFounders();
        loadTags();
        loadIncubators();
        loadTargetMarkets();
      });

      controller.queryInvestors = function(query) {
        return adminListInvestorsService.filter(query);
      };

      controller.queryTags = function(query) {
        return listTagsService.filter(query);
      };

      controller.addTag = function(tag) {
        controller.company.tags.push(tag.text);
      };

      controller.queryHubs = function(query) {
        return listHubsService.filter(query);
      };

      controller.removeTag = function(tag) {
        controller.company.tags.splice(controller.company.tags.indexOf(tag.text), 1);
      };

      controller.addIncubator = function(incubator) {
        controller.company.incubators.push(incubator.text);
      };

      controller.removeIncubator = function(incubator) {
        controller.company.incubators.splice(controller.company.incubators.indexOf(incubator.text), 1);
      };

      controller.addFounder = function() {
        controller.company.founders.push({
          name: "",
          linkedin: ""
        });
      };

      controller.removeFounder = function(founder) {
        controller.company.founders.splice(controller.company.founders.indexOf(founder), 1);
      };

      controller.addFundingRound = function() {
        controller.company.funding_rounds.push({});
      };

      controller.removeFundingRound = function(round) {
        controller.company.funding_rounds.splice(controller.company.funding_rounds.indexOf(round), 1);
      };

      controller.addOfficeLocation = function() {
        controller.company.office_locations.push({
          id: controller.company.office_locations.length + 1,
          address: "",
          lat: null,
          lng: null
        });
      };

      controller.removeOfficeLocation = function(location) {
        controller.company.office_locations.splice(controller.company.office_locations.indexOf(location), 1);
      };

      function setTargetMarkets() {
        controller.company.target_markets = [];
        for (var key in controller.target_markets) {
          if (controller.target_markets.hasOwnProperty(key) && controller.target_markets[key]) {
            controller.company.target_markets.push(key);
          }
        }
        controller.company.target_markets = controller.company.target_markets.join(',')
      }

      this.update = function() {
        setTargetMarkets();

        updateCompanyService.update(controller.company)
          .then(function(company) {
            controller.company = company;
            setFundingRounds();
            setOfficeLocations();
            setFounders();
            Notification.success('Company Updated!')
          }, function() {
            Notification.error('Error: Company could not be saved!')
          })
      }
    })
})();
