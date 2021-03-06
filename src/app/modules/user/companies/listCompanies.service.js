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

      this.filter = function(query) {
        var basePath = serverUrl + '/user/companies?typeahead=true&filter=' + query;
        return $http.get(basePath);
      };

      this.export = function() {
        var basePath = serverUrl + '/user/companies/export'
        return $http.get(basePath);
      };
    });
})();
