(function() {
  "use strict";

  angular
    .module('admin')
    .component('adminHubsIndex', {
      controller: 'AdminHubsIndexController',
      templateUrl: 'app/modules/admin/hubs/hubs.index.html'
    })
    .controller('AdminHubsIndexController', function(store, $state, adminListHubsService, deleteHubService, restoreHubService, Notification, exportToCSV) {
      this.adminListHubsService = adminListHubsService;
      this.deleteHubService = deleteHubService;
      this.restoreHubService = restoreHubService;
      var controller = this;

      getHubs();

      function getHubs() {
        adminListHubsService.getAll().then(function(hubs) {
          controller.hubs = hubs;
        });
      }

      this.deleteHub = function(id) {
        controller.deleteHubService.delete(id).then(function() {
          getHubs();
          Notification.success('The entry has been deleted.')
        })
      };

      this.restoreHub = function(id) {
        controller.restoreHubService.restore(id).then(function() {
          getHubs();
          Notification.success('The entry has been restored!')
        })
      };

      this.export = function() {
        exportToCSV.export('admin', 'hubs').then(function(data) {
          var anchor = angular.element('<a/>');
          anchor.attr({
            href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
            target: '_blank',
            download: 'hubs.csv'
          })[0].click();
        })
      };

    });
})();
