(function() {
  "use strict";

  angular
    .module('user')
    .component('userHubsIndex', {
      controller: 'UserHubsIndexController',
      templateUrl: 'app/modules/user/hubs/hubs.index.html'
    })
    .controller('UserHubsIndexController', function(store, $state, $confirm, userListHubsService, userClaimEntityService, deleteHubService, restoreHubService, Notification, exportToCSV, $document) {
      this.userListHubsService = userListHubsService;
      this.deleteHubService = deleteHubService;
      this.restoreHubService = restoreHubService;
      this.userClaimEntityService = userClaimEntityService;

      var searchHubs = angular.element($document[0].getElementById("searchHubs"))

      var controller = this;
      controller.hubs = {
        "user_hubs": [],
        "pending_hubs": []
      }

      getUserHubs();

      function getUserHubs() {
        userListHubsService.getAll().then(function(hubs) {
          controller.hubs = hubs;
        });
      }

      this.filterUnclaimedHubs = function(query) {
        return userListHubsService.filterUnclaimedHubs(query).then(function(response){
          return response.data;
        });
      }

      this.claimHub = function(e, id) {
        var requestedClaim = {
          entity_id: id,
          entity_type: 'hub'
        }

        $confirm({text: "Are you sure you want request ownership of this hub?"}).then(function() {
          controller.userClaimEntityService.create(requestedClaim).then(function(response) {
            searchHubs.val("");
            controller.selected = null;
            controller.hubs.pending_hubs.push(response.data);
            Notification.success('Claim has been requested sucessfully. The Admin team will review this shortly!');
          });
        })
      };

      this.export = function() {
        exportToCSV.export('user', 'hubs').then(function(data) {
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
