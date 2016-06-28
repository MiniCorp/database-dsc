(function() {
  "use strict";
  angular
    .module('user')
    .component('userAccountActivated', {
      templateUrl: 'app/modules/user/userAccountActivated.html',
      controller: 'UserAccountActivatedController'
    })
    .controller('UserAccountActivatedController', function(store, $state, userAccountActivateService, $scope, $location, $document) {
      var controller = this;

      this.userAccountActivateService = userAccountActivateService;

      var token = $location.search().token;
      var email = $location.search().email;

      this.params = {
        "user": {},
        "account_activation": {
          "email": email
        }
      };

      this.verifyAccount = function() {
        // reset messages
        controller.accountActivationFail = false;
        controller.accountActivationSuccess = false;

        userAccountActivateService.verifyAccount(token, this.params).then(function() {
          controller.accountActivationSuccess = true;
        }).catch(function () {
          controller.accountActivationFail = true;
        })
      };

      this.verifyAccount();
    });
})();
