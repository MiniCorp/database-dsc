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

      this.filterUnclaimedInvestors = function(query) {
        var basePath = serverUrl + '/user/investors.json?filter=' + query;
        return $http.get(basePath);
      };

      this.filter = function(query) {
        var basePath = serverUrl + '/user/investors?typeahead=true&filter=' + query;
        return $http.get(basePath);
      };

    });
})();
