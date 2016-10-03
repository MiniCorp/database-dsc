(function(){
  "use strict";

  angular
    .module('user')
    .service('userAccountActivateService', function($http, $httpParamSerializer, serverUrl){

      this.verifyEmail = function(token, params) {
        var baseUrl = serverUrl + '/users/' + token + '/verify_email';

        return $http.put(baseUrl, params).then(function(responseObject) {
          return responseObject.data;
        });
      };
    })
})();
