(function() {
  "use strict";
  angular
    .module('user')
    .component('userSignup', {
      templateUrl: 'app/modules/user/userSignup.html',
      controller: 'UserSignUpController'
    })
    .controller('UserSignUpController', function(store, $state, signUpService, $auth) {
      this.signUpService = signUpService;
      var controller = this;

      this.userInfo = { user: {} };

      this.signUp = function() {
        controller.signUpFail = false;
        controller.customFail = false;
        controller.customFailMessage = "";
        controller.passwordResetSuccess = false;

        signUpService.signUp(this.userInfo, false).then(function(response) {
          if (response.error) {
            controller.customFail = true;
            controller.customFailMessage = response.error;
          }
          else {
            $auth.setToken(response.jwt);
            $state.go('user.companies.index');
          }
        }).catch(function () {
          controller.signUpFail = true;
        })
      };
    });
})();
