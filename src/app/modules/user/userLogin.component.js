(function() {
  "use strict";
  angular
    .module('user')
    .component('userLogin', {
      templateUrl: 'app/modules/user/userLogin.html',
      controller: 'UserLoginController'
    })
    .controller('UserLoginController', function(store, $state, loginService, signUpService, $scope, $auth, $window) {
      this.loginService = loginService;
      this.signUpService = signUpService;
      var controller = this;

      this.authenticate = function(provider) {
        $auth.authenticate(provider).then(function() {
          $state.go('user.companies.index');
        });
      };

      this.userCredentials = {auth: {} };

      this.login = function() {
        loginService.authenticate(this.userCredentials).then(function(response) {
          if (response.error) {
            controller.loginFail = false
            controller.customFail = true;
            controller.customFailMessage = response.error;
          }
          else {
            $auth.setToken(response.token);
            $window.sessionStorage.setItem('userEmail', response.email);
            $window.sessionStorage.setItem('userFirstName', response.first_name);
            $window.sessionStorage.setItem('userLastName', response.last_name);
            $window.sessionStorage.setItem('userCreatedAt', response.created_at);
            $state.go('user.companies.index');
          }
        }).catch(function () {
          controller.loginFail = true;
        })
      };
    });
})();
