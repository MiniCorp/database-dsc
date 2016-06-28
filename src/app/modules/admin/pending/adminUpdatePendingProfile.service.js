(function(){
  angular
    .module('user')
    .service('adminUpdatePendingProfile', function(store, serverUrl, $http){

      this.update = function(pendingStatus) {
        var basePath = serverUrl + '/admin/user_entity_pending/' + pendingStatus.id;

        return $http.put(basePath, pendingStatus).then(function(responseObject) {
          return responseObject;
        })
      };
    });
})();
