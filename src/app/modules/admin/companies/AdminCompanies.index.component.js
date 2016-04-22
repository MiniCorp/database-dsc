(function() {
  "use strict";

  angular
    .module('admin')
    .component('adminCompaniesIndex', {
      controller: 'AdminCompaniesIndexController',
      templateUrl: 'app/modules/admin/companies/companies.index.html'
    })
    .controller('AdminCompaniesIndexController', function(listCompaniesService, deleteCompanyService, restoreCompanyService, Notification) {
      this.listCompaniesService = listCompaniesService;
      this.deleteCompanyService = deleteCompanyService;
      this.restoreCompanyService = restoreCompanyService;
      var controller = this;

      getCompanies();

      function getCompanies() {
        listCompaniesService.getAll().then(function(companies) {
          controller.companies = companies;
        });
      }

      this.deleteCompany = function(id) {
        controller.deleteCompanyService.delete(id).then(function() {
          getCompanies();
          Notification.success('The entry has been deleted.')
        })
      };

      this.restoreCompany = function(id) {
        controller.restoreCompanyService.restore(id).then(function() {
          getCompanies();
          Notification.success('The entry has been restored!')
        })
      };
    });
})();
