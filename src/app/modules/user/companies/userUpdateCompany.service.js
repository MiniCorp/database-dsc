(function(){
  "use strict";

  angular
    .module('user')
    .service('userUpdateCompanyService', function(store, serverUrl, $http, Upload) {

      this.update = function(company) {
        var basePath = serverUrl + '/user/companies/' + company.id;

        var options = {
          "url": basePath,
          "method": "PUT",
          "data": {
            "company": {
              "id": company.id,
              "name": company.name == null ? "" : company.name,
              "logo": company.logo == null ? "" : company.logo,
              "short_description": company.short_description == null ? "" : company.short_description,
              "headquarters": company.headquarters == null ? "" : company.headquarters,
              "formerly_known_as": company.formerly_known_as == null ? "" : company.formerly_known_as,
              "incubator": company.incubator == null ? "" : company.incubator,
              "employees": company.employees,
              "funding_stage": company.funding_stage == null ? "" : company.funding_stage,
              "funding_amount": company.funding_amount,
              "product_stage": company.product_stage == null ? "" : company.product_stage,
              "target_markets": company.target_markets == null ? "" : company.target_markets,
              "business_model": company.business_model == null ? "" : company.business_model,
              "company_stage": company.company_stage == null ? "" : company.company_stage,
              "operational_status": company.operational_status == null ? "" : company.operational_status,
              "funding_rounds": company.funding_rounds,
              "looking_for": company.looking_for == null ? "" : company.looking_for,
              "government_assistance": company.government_assistance == null ? "" : company.government_assistance,
              "contact": company.contact == null ? "" : company.contact,
              "long_description": company.long_description == null ? "" : company.long_description,
              "founded": company.founded == null ? "" : company.founded,
              "acquisitions": company.acquisitions == null ? "" : company.acquisitions,
              "video_url": company.video_url == null ? "" : company.video_url,
              "website": company.website == null ? "" : company.website,
              "social_accounts": company.social_accounts,
              "office_locations": company.office_locations,
              "tags": company.tags,
              "founders": company.founders,
              "acquired": company.acquired == null ? "" : company.acquired,
              "revenue": company.revenue,
              "recently_funded": company.recently_funded,
              "female_founder": company.female_founder,
              "exec_summary": company.exec_summary,
              "allow_sharing": company.allow_sharing,
              "incubators": company.incubators.length == 0 ? "" : company.incubators
            }
          },
          "arrayKey": "[]"
        };

        return Upload.upload(options).then(function(responseObject) {
          return responseObject.data;
        });
      }

      this.removeExecutiveSummary = function(company) {
        var basePath = serverUrl + '/user/companies/' + company.id + '/remove_exec_summary';
        return $http.delete(basePath);
      }
    })

})();
