(function() {
  'use strict';

  angular
    .module("user")
    .component("userMultinationalsIndex", {
      templateUrl: 'app/modules/user/multinationals/multinationals.index.html',
      controller: 'UserMultinationalsIndexController'
    })
    .controller('UserMultinationalsIndexController', function(store, $state, $confirm, userListMultinationalsService, userClaimEntityService, Notification, exportToCSV, $document) {
      this.userClaimEntityService = userClaimEntityService;
      var searchMultinationals = angular.element($document[0].getElementById("searchMultinationals"))

      var controller = this;

      controller.multinationals = {
        "user_multinationals": [],
        "pending_multinationals": []
      }

      getUserMultinationals();

      function getUserMultinationals() {
        userListMultinationalsService.getAll().then(function(multinationals) {
          controller.multinationals = multinationals;
        });
      }

      this.filterUnclaimedMultinationals = function(query) {
        return userListMultinationalsService.filterUnclaimedMultinationals(query).then(function(response){
          return response.data;
        });
      }

      this.claimMultinational = function(e, id) {
        var requestedClaim = {
          entity_id: id,
          entity_type: 'multinational'
        }

        $confirm({text: "Are you sure you want request ownership of this multinational?"}).then(function() {
          controller.userClaimEntityService.create(requestedClaim).then(function(response) {
            searchMultinationals.val("");
            controller.selected = null;
            controller.multinationals.pending_multinationals.push(response.data);
            Notification.success('Claim has been requested sucessfully. The Admin team will review this shortly!');
          });
        })
      };

      this.export = function() {
        exportToCSV.export('user', 'multinationals').then(function(data) {
          var anchor = angular.element('<a/>');
          anchor.attr({
            href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
            target: '_blank',
            download: 'multinationals.csv'
          })[0].click();
        })
      };

    })
})();
