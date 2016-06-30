(function() {
  "use strict";

  angular
    .module('admin')
    .component('adminUsersIndex', {
      controller: 'AdminUsersIndexController',
      templateUrl: 'app/modules/admin/users/users.index.html'
    })
    .controller('AdminUsersIndexController', function(store, $state, adminListUsersService, Notification, exportToCSV) {
      this.adminListUsersService = adminListUsersService;
      var controller = this;

      getHubs();

      function getHubs() {
        adminListUsersService.getAll().then(function(users) {
          controller.users = users;
        });
      }

      this.export = function() {
        exportToCSV.export('admin', 'users').then(function(data) {
          var anchor = angular.element('<a/>');
          anchor.attr({
            href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
            target: '_blank',
            download: 'users.csv'
          })[0].click();
        })
      };

    });
})();
