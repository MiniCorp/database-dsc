(function() {
  'use strict';

  angular
    .module('companyProfile')
    .component('companyProfile', {
      templateUrl: 'app/modules/entities/companies/profile/profile.html',
      controller: 'CompaniesProfilesController'
    })
    .controller('CompaniesProfilesController', function($scope, $stateParams, getCompanyService, NgMap) {
      var controller = this;
      this.getCompanyService = getCompanyService;

      NgMap.getMap().then(function(map) {
        controller.map = map;
      });

      controller.showOfficeLocationDetail = function(evt, officeLocation) {
        controller.officeLocation = officeLocation;
        controller.map.showInfoWindow('foo-iw', "ol" + officeLocation.id);
      };

      controller.zoomTo = function() {
        var marker = this.map.markers["ol" + this.officeLocation.id];
        var markerPosition = marker.getPosition();
        this.map.setZoom(16);
        this.map.panTo(markerPosition);
      };



      this.company = getCompanyService.find($stateParams.id).then(function(company) {
        controller.company = company;


        switch (true) {
          case (company.employees > 1 && company.employees < 6):
            controller.company.employeeRangeText = "1-5";
            break;
          case (company.employees > 5 && company.employees < 11):
            controller.company.employeeRangeText = "6-10";
            break;
          case (company.employees > 10 && company.employees < 26):
            controller.company.employeeRangeText = "11-25";
            break;
          case (company.employees > 25 && company.employees < 51):
            controller.company.employeeRangeText = "26-50";
            break;
          case (company.employees > 49 && company.employees < 101):
            controller.company.employeeRangeText = "50-100";
            break;
          case (company.employees > 100 && company.employees < 251):
            controller.company.employeeRangeText = "100-250";
            break;
          case (company.employees > 249 && company.employees < 501):
            controller.company.employeeRangeText = "250-500";
            break;
          case (company.employees > 499):
            controller.company.employeeRangeText = "> 500";
            break;
          default:
            break;
        }
      });
    });

})();
