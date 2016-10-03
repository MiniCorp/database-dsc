(function() {
  angular
    .module('admin')
    .service('listHubsService', function(serverUrl, $http) {

      this.filter = function(query) {
        var basePath = serverUrl + '/admin/hubs?filter=' + query;
        return $http.get(basePath);
      };
    });
})();
