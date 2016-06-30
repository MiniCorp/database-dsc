(function() {
  angular
    .module('user')
    .service('listCompaniesService', function(store, serverUrl, $http) {

      this.getAll = function() {
        var basePath = serverUrl + '/user/companies';

        return $http.get(basePath).then(function(responseObject) {
          return responseObject.data;
        })
      };

      this.filterUnclaimedCompanies = function(query) {
        var basePath = serverUrl + '/user/companies.json?filter=' + query;
        return $http.get(basePath);
      };
    });
})();
