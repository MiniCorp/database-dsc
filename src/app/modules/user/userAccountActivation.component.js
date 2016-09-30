(function() {
  "use strict";
  angular
    .module('user')
    .component('userAccountActivated', {
      templateUrl: 'app/modules/user/userAccountActivated.html',
      controller: 'UserAccountActivatedController'
    })
    .controller('UserAccountActivatedController', function(store, $state, userAccountActivateService, $scope, $location, $document, $auth) {
      var controller = this;

      this.userAccountActivateService = userAccountActivateService;

      var token = $location.search().token;
      var email = $location.search().email;

      this.params = {
        "user": {},
        "email_verification": {
          "email": email
        }
      };

      this.verifyEmail = function() {
        // reset messages
        controller.accountActivationFail = false;
        controller.accountActivationSuccess = false;

        userAccountActivateService.verifyEmail(token, this.params).then(function(response) {
          debugger;
          $auth.setToken(response.jwt);
          controller.accountActivationSuccess = true;
        }).catch(function () {
          controller.accountActivationFail = true;
        })
      };

      this.verifyEmail();
    });
})();
