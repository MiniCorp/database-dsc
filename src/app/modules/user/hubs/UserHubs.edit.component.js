(function() {
  "use strict";

  angular
    .module('user')
    .component('userHubsEdit', {
      templateUrl: 'app/modules/user/hubs/hubs.edit.html',
      controller: 'UserHubsEditController'
    })
    .controller('UserHubsEditController', function(store, $state, userGetHubService,
      userUpdateHubService, $stateParams, Notification, listTagsService, listCompaniesService) {

      var controller = this;
      this.hub_type = {};
      this.tags = [];
      this.fundingTypes = [];
      this.officeLocations = [];

      function loadTags() {
        if (!controller.hub.tags || angular.isFunction(controller.hub.tags.forEach) == false) {
          controller.hub.tags = [];
          return;
        }

        controller.hub.tags.forEach(function(tag) {
          controller.tags.push({text: tag})
        });
      }

      function convertDeadlineDateForDisplay() {

        if (controller.hub.applications) {
          for (var i = 0; i < controller.hub.applications.length; i++) {
            var application = controller.hub.applications[i];
            if (application.deadline != undefined && angular.isString(application.deadline)) {
              application.deadline = Date.parse(application.deadline);
            }
          }
        }
      }

      controller.queryCompanies = function(query) {
        return listCompaniesService.filter(query);
      };

      controller.toggleCalendar = function(application) {
        application.opened = true;
      };

      controller.queryTags = function(query) {
        return listTagsService.filter(query);
      };

      controller.addApplication = function() {
        controller.hub.applications.push({
          title: "",
          deadline: "",
          link: "",
          opened: false
        });
      };

      controller.removeApplication = function(application) {
        controller.hub.applications.splice(controller.hub.applications.indexOf(application), 1);
      }

      controller.addPrivateContact = function() {
        controller.hub.contact_urls.push({
          name: "",
          email: "",
          phone: ""
        });
      };

      controller.removePrivateContact = function(contact) {
        controller.hub.contact_urls.splice(controller.hub.contact_urls.indexOf(contact), 1);
      };

      controller.addTag = function(tag) {
        controller.hub.tags.push(tag.text);
      };

      controller.removeTag = function(tag) {
        controller.hub.tags.splice(controller.hub.tags.indexOf(tag.text), 1);
      };

      function loadHubTypes() {
        controller.hub.hub_type.forEach(function(code) {
          controller.hub_type[code] = true
        });
      }

      function setHubTypes() {
        controller.hub.hub_type = [];
        for (var key in controller.hub_type) {
          if (controller.hub_type.hasOwnProperty(key) && controller.hub_type[key]) {
            controller.hub.hub_type.push(key);
          }
        }
        controller.hub.hub_type = controller.hub.hub_type
      }

      function setContactURLs() {
        if (!controller.hub.contact_urls || angular.isFunction(controller.hub.contact_urls.push) == false)
          controller.hub.contact_urls = [];
      }

      function setApplications() {
        if (!controller.hub.applications || angular.isFunction(controller.hub.applications.push) == false)
          controller.hub.applications = [];
      }

      userGetHubService.find($stateParams.id).then(function(hub) {
        controller.hub = hub;
        convertDeadlineDateForDisplay();
        setContactURLs();
        setApplications();
        loadTags();
        loadHubTypes();
      });

      this.update = function() {
        setHubTypes();
        userUpdateHubService.update(controller.hub)
          .then(function(hub) {
            controller.hub = hub;
            convertDeadlineDateForDisplay();
            setContactURLs();
            setApplications();
            Notification.success('Hub Updated!')
          }, function() {
            Notification.error('Error: Hub could not be saved!')
          })
      }
    })
})();
