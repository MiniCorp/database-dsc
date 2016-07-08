(function(){
  angular
    .module('user')
    .service('userListMultinationalsService', function(store, serverUrl, $http){

      this.getAll = function() {
        var basePath = serverUrl + '/user/multinationals';

        return $http.get(basePath).then(function(responseObject) {
          return responseObject.data;
        })
      };

      this.filterUnclaimedMultinationals = function(query) {
        var basePath = serverUrl + '/user/multinationals.json?filter=' + query;
        return $http.get(basePath);
      };
    });
})();
