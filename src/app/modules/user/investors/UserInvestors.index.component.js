(function() {
  "use strict";

  angular
    .module('user')
    .component('userInvestorsIndex', {
      controller: 'UserInvestorsIndexController',
      templateUrl: 'app/modules/user/investors/investors.index.html'
    })
    .controller('UserInvestorsIndexController', function(store, $state, $confirm, userListInvestorsService, userClaimEntityService, deleteInvestorService, restoreInvestorService, Notification, exportToCSV, $document) {
      this.userListInvestorsService = userListInvestorsService;
      this.deleteInvestorService = deleteInvestorService;
      this.restoreInvestorService = restoreInvestorService;
      this.userClaimEntityService = userClaimEntityService;
      var searchInvestors = angular.element($document[0].getElementById("searchInvestors"))

      var controller = this;

      controller.investors = {
        "user_investors": [],
        "pending_investors": []
      }

      getUserInvestors();

      function getUserInvestors() {
        userListInvestorsService.getAll().then(function(investors) {
          controller.investors = investors;
        });
      }

      this.filterUnclaimedInvestors = function(query) {
        return userListInvestorsService.filterUnclaimedInvestors(query).then(function(response){
          return response.data;
        });
      }

      this.claimInvestor = function(e, id) {
        var requestedClaim = {
          entity_id: id,
          entity_type: 'investor'
        }

        $confirm({text: "Are you sure you want request ownership of this investor?"}).then(function() {
          controller.userClaimEntityService.create(requestedClaim).then(function(response) {
            searchInvestors.val("");
            controller.selected = null;
            controller.investors.pending_investors.push(response.data);
            Notification.success('Claim has been requested sucessfully. The Admin team will review this shortly!');
          });
        })
      };

      this.export = function() {
        exportToCSV.export('user', 'investors').then(function(data) {
          var anchor = angular.element('<a/>');
          anchor.attr({
            href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
            target: '_blank',
            download: 'investors.csv'
          })[0].click();
        })
      };

    });
})();
