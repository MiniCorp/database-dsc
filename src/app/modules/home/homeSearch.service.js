(function() {
  'use strict';

  angular
    .module('home')
    .service('homeSearchService', function($http, $httpParamSerializer, serverUrl) {

      this.getData = function(query) {
        var basePath = serverUrl + '/home_search?filter=' + query;
        return $http.get(basePath);
      };
    });
})();
