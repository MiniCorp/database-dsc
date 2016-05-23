(function(){
  "use strict";

  angular
    .module('admin')
    .service('updateInvestorService', function(store, serverUrl, $http) {

      function token() {
        return store.get('jwt');
      }

      this.update = function(investor) {
        var basePath = serverUrl + '/admin/investors/' + investor.id;

        var req = {
          method: 'PUT',
          url: basePath,
          headers: {
            'Authorization': 'Bearer ' + token()
          },
          data: investor
        }

        return $http(req).then(function(responseObject) {
          return responseObject.data;
        })
      }
    })

})();