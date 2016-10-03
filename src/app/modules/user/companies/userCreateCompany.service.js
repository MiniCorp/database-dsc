(function(){
  angular
    .module('user')
    .service('userCreateCompanyService', function(store, serverUrl, $http, Upload){

      this.create = function(company) {
        var basePath = serverUrl + '/user/companies';

        var options = {
          "url": basePath,
          "method": "POST",
          "data": {
            "file": company.exec_summary || [],
            "company": company
          },
          "arrayKey": "[]",
          "fileFormDataName": "company[exec_summary]"
        };

        return Upload.upload(options).then(function(responseObject) {
          return responseObject;
        });
      };
    });
})();
