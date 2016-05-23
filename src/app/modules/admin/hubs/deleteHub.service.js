(function(){
  "use strict";

  angular
    .module('admin')
    .service('deleteHubService', function(store, serverUrl, $http) {

      function token() {
        return store.get('jwt');
      }

      this.delete = function(id){
        var basePath = serverUrl + '/admin/hubs/' +id;

        var req = {
          method: 'DELETE',
          url: basePath,
          headers: {
            'Authorization': 'Bearer ' + token()
          }
        }

        return $http(req);
      }
    })
})();