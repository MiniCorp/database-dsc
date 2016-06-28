(function() {
  angular
    .module('admin')
    .service('adminListPendingProfilesService', function(store, serverUrl, $http) {

      this.getAll = function() {
        var basePath = serverUrl + '/admin/user_entity_pending';

        return $http.get(basePath).then(function(responseObject) {
          return responseObject.data;
        })
      };
    });
})();
