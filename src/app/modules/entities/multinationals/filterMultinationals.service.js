(function() {
  'use strict';

  angular
    .module('searchMultinationals')
    .service('filterMultinationalsService', function() {

      this.filtersData = function() {
        return this.data;
      };

      this.data = {
        employees: {
          type: 'dropdown',
          id: 'employees',
          label: 'Employees in Ireland',
          selectedValue: '',
          noSelectionString: 'Any number',
          values: ['1-5', '6-10', '11-25', '26-50', '50-100', '101-250', '250-500', '501-1000', '1000+']
        },
        functions: {
          type: 'checklist',
          id: 'functions',
          label: 'Functions in Ireland',
          selectedValue: '',
          noSelectionString: 'Any function',
          selectedString: 'Any function',
          values: [
            {label: 'Sales', code: 'S'},
            {label: 'Customer Service', code: 'CS'},
            {label: 'Finance', code: 'F'},
            {label: 'Legal', code: 'L'},
            {label: 'Server Infrastructure', code: 'SI'},
            {label: 'Engineering', code: 'E'},
            {label: 'Marketing', code: 'M'},
            {label: 'Research and Development', code: 'RD'},
            {label: 'Manufacturing', code: 'MF'},
            {label: 'Operations', code: 'O'},
            {label: 'Product Development', code: 'PD'}
          ]
        },
        emeaHq: {
          type: 'dropdown',
          id: 'emea-hq',
          label: 'European/EMEA HQ in Ireland',
          selectedValue: '',
          noSelectionString: 'Yes & No',
          values: ['Yes', 'No']
        },
        startupPackages: {
          type: 'dropdown',
          id: 'startup-packages',
          label: 'Startup Package',
          selectedValue: '',
          noSelectionString: 'Yes & No',
          values: ['Yes', 'No']
        },
        buildingProductInIreland: {
          type: 'dropdown',
          id: 'building-product-in-ireland',
          label: 'Building Product in Ireland',
          selectedValue: '',
          noSelectionString: 'Yes & No',
          values: ['Yes', 'No']
        },
        eventsSpace: {
          type: 'dropdown',
          id: 'events-space',
          label: 'Events Space',
          selectedValue: '',
          noSelectionString: 'Yes & No',
          values: ['Yes', 'No']
        }
      };
    })
})();
