(function() {
  angular
    .module('user')
    .service('userListInvestorsService', function(store, serverUrl, $http) {

      this.getAll = function() {
        var basePath = serverUrl + '/user/investors';

        return $http.get(basePath).then(function(responseObject) {
          return responseObject.data;
        })
      };

      this.filter = function(query) {
        var basePath = serverUrl + '/user/investors?filter=' + query;
        return $http.get(basePath);
      };

    });
})();
