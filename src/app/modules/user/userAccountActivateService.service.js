(function(){
  "use strict";

  angular
    .module('user')
    .service('userAccountActivateService', function($http, $httpParamSerializer, serverUrl){

      this.verifyAccount = function(token, params) {
        var baseUrl = serverUrl + '/users/' + token + '/verify_account';

        return $http.put(baseUrl, params).then(function(responseObject) {
          return responseObject.data;
        });
      };
    })
})();
