(function() {
  "use strict";

  angular
    .module('user')
    .component('userCompaniesIndex', {
      controller: 'UserCompaniesIndexController',
      templateUrl: 'app/modules/user/companies/companies.index.html'
    })
    .controller('UserCompaniesIndexController', function(store, $state, $confirm, $location, jwtHelper, listCompaniesService, userClaimEntityService, deleteCompanyService, restoreCompanyService, Notification, exportToCSV, $document) {
      this.listCompaniesService = listCompaniesService;
      this.deleteCompanyService = deleteCompanyService;
      this.restoreCompanyService = restoreCompanyService;
      this.userClaimEntityService = userClaimEntityService;

      var searchCompanies = angular.element($document[0].getElementById("searchCompanies"))

      var controller = this;
      controller.companies = {
        "user_companies": [],
        "pending_companies": []
      }

      getUserCompanies();

      function getUserCompanies() {
        listCompaniesService.getAll().then(function(companies) {
          controller.companies = companies;
        });
      }

      this.filterUnclaimedCompanies = function(query) {
        return listCompaniesService.filterUnclaimedCompanies(query).then(function(response){
          return response.data;
        });
      }

      this.claimCompany = function(e, id) {
        var requestedClaim = {
          entity_id: id,
          entity_type: 'company'
        }

        $confirm({text: "Are you the owner of this company?"}).then(function() {
          controller.userClaimEntityService.create(requestedClaim).then(function(response) {
            searchCompanies.val("");
            controller.selected = null;
            controller.companies.pending_companies.push(response.data);
            Notification.success('Claim has been requested sucessfully. The Admin team will review this shortly!');
          });
        })
      };

      this.export = function() {
        exportToCSV.export('user', 'companies').then(function(data) {
          var anchor = angular.element('<a/>');
          anchor.attr({
            href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
            target: '_blank',
            download: 'companies.csv'
          })[0].click();
        })
      };

      this.ensureIrish = function() {
        $confirm({text: "TechIreland is for Irish tech companies with products (not services for hire). Are you a product based company?"}).then(function() {
          $location.path('/user/companies/new');
        })
      };
    });
})();
