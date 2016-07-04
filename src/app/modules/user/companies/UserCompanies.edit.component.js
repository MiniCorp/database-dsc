(function() {
  "use strict";

  angular
    .module('user')
    .component('userCompaniesEdit', {
      templateUrl: 'app/modules/user/companies/companies.edit.html',
      controller: 'UserCompaniesEditController'
    })
    .controller('UserCompaniesEditController', function(store, $state, userGetCompanyService, userUpdateCompanyService, $stateParams, Notification, listTagsService, userListHubsService, userListInvestorsService, $document) {
      var controller = this;
      this.tags = [];
      this.incubators = [];
      this.target_markets = {};

      function loadTags() {
        controller.company.tags.forEach(function(tag) {
          controller.tags.push({text: tag})
        });
      }

      function loadIncubators() {
        if (!controller.company.incubators || angular.isFunction(controller.company.incubators.forEach) == false) {
          controller.company.incubators = [];
          return;
        }

        controller.company.incubators.forEach(function(incubator) {
          controller.incubators.push({text: incubator})
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

      userGetCompanyService.find($stateParams.id).then(function(company) {
        if (company == undefined) {
          $state.go('user.companies.index');
          return;
        }

        controller.company = company;
        setFundingRounds();
        setOfficeLocations();
        setFounders();
        loadTags();
        loadIncubators();
        loadTargetMarkets();
      });

      controller.clearExecutiveSummary = function() {
        userUpdateCompanyService.removeExecutiveSummary(controller.company)
          .then(function() {
            angular.element($document[0].getElementById('fileInput')).val('');
            controller.company.exec_summary = undefined;
            controller.company.exec_summary_file_name = null;
            Notification.success('Execute Summary deleted.');
          }, function() {
            Notification.error('Error: Executive Summary could not be deleted.');
          });
      };

      controller.queryInvestors = function(query) {
        return userListInvestorsService.filter(query);
      };

      controller.queryTags = function(query) {
        return listTagsService.filter(query);
      };

      controller.queryHubs = function(query) {
        return userListHubsService.filter(query);
      };

      controller.addTag = function(tag) {
        controller.company.tags.push(tag.text);
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
        controller.company.target_markets = controller.company.target_markets.join(', ')
      }

      this.update = function() {
        setTargetMarkets();

        if (controller.company.funding_rounds.length == 0) {
          controller.company.funding_rounds = null;
        }

        if (controller.company.office_locations.length == 0) {
          controller.company.office_locations = null;
        }

        if (controller.company.founders.length == 0) {
          controller.company.founders = null;
        }

        if (controller.company.tags.length == 0) {
          controller.company.tags = null;
        }

        // is there a file to upload? If so display a message as it could take a several seconds
        if (angular.element($document[0].getElementById('fileInput')).val().trim().length > 0)
          Notification.info('Updating company...');

        userUpdateCompanyService.update(controller.company)
          .then(function(company) {
            controller.company = company;
            angular.element($document[0].getElementById('fileInput')).val('');
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
