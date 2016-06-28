(function() {
  "use strict";

  angular
    .module('admin')
    .component('adminPendingIndex', {
      controller: 'AdminPendingIndexController',
      templateUrl: 'app/modules/admin/pending/pending.index.html'
    })
    .controller('AdminPendingIndexController', function(store, $state, $confirm, jwtHelper, Notification, adminListPendingProfilesService, adminUpdatePendingProfile) {
      this.adminListPendingProfilesService = adminListPendingProfilesService;
      this.adminUpdatePendingProfile = adminUpdatePendingProfile;
      var controller = this;
      controller.pendingProfiles = [];

      getPendingProfiles();

      function getPendingProfiles() {
        adminListPendingProfilesService.getAll().then(function(pendingProfiles) {
          controller.pendingProfiles = pendingProfiles;
        });
      }

      this.approveProfile = function(e, id) {
        var pendingStatus = {
          id: id,
          status: 'approved'
        }

        $confirm({text: "Are you sure you want to set this profile live?"}).then(function() {
          controller.adminUpdatePendingProfile.update(pendingStatus).then(function() {
            Notification.success('Profile has been approved.');
            getPendingProfiles();
          });
        })
      };

      this.denyProfile = function(e, id) {
        var pendingStatus = {
          id: id,
          status: 'denied'
        }

        $confirm({text: "Are you sure you want to reject this profile?"}).then(function() {
          controller.adminUpdatePendingProfile.update(pendingStatus).then(function() {
            Notification.success('Profile has been rejected.');
            getPendingProfiles();
          });
        });
      };
    });
})();
