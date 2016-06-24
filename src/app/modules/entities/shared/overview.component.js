(function() {
  "use strict";

  angular
    .module('profile')
    .component('profileOverview', {
      templateUrl: 'app/modules/entities/shared/overview.html',
      controller: 'OverviewController',
      bindings: {
        entity: '=',
        entityType: '@'
      }
    })
    .controller('OverviewController', function($scope, $sce, serverUrl) {
      var controller = this;

      controller.serverUrl = serverUrl.substring(0, serverUrl.lastIndexOf('/'));

      controller.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
    })
})();
