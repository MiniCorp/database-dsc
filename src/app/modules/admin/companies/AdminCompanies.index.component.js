(function() {
  "use strict";

  angular
    .module('admin')
    .component('adminCompaniesIndex', {
      controller: 'AdminCompaniesIndexController',
      templateUrl: 'app/modules/admin/companies/companies.index.html'
    })
    .controller('AdminCompaniesIndexController', function($auth, store, $state, jwtHelper, adminListCompaniesService, deleteCompanyService, restoreCompanyService, Notification, exportToCSV) {
      this.adminListCompaniesService = adminListCompaniesService;
      this.deleteCompanyService = deleteCompanyService;
      this.restoreCompanyService = restoreCompanyService;
      var controller = this;

      getCompanies();

      function getCompanies() {
        adminListCompaniesService.getAll().then(function(companies) {
          controller.companies = companies;
        });
      }

      this.deleteCompany = function(id) {
        controller.deleteCompanyService.delete(id).then(function() {
          getCompanies();
          Notification.success('The entry has been deleted.')
        });
      };

      this.restoreCompany = function(id) {
        controller.restoreCompanyService.restore(id).then(function() {
          getCompanies();
          Notification.success('The entry has been restored!')
        });
      };

      this.export = function() {
        adminListCompaniesService.export().then(function() {
          Notification.success('Export requested. You will receive this via email shortly.')
        });
      };
    });
})();
