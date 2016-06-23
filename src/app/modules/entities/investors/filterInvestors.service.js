(function() {
  'use strict';

  angular
    .module('searchInvestors')
    .service('filterInvestorsService', function() {

      this.filtersData = function() {
        return this.data;
      };

      this.data = {
        fundingTypes: {
          type: 'checklist',
          id: 'funding-type',
          label: 'Type of Funding',
          selectedValue: '',
          noSelectionString: 'Any type',
          selectedString: 'Any type',
          values: [
            { label: 'Pre-seed', code: 'PS'},
            { label: 'Seed', code: 'S' },
            { label: 'Series A', code: 'SA' },
            { label: 'Series B', code: 'SB' },
            { label: 'Series C', code: 'SC'},
            { label: 'Series C+', code: 'SCP'}
          ]
        },
        investmentSize: {
          type: 'slider',
          id: 'investment-size',
          label: 'Investment Size',
          selectedValue: '',
          defaultRange: {min: 10000, max: 100000000},
          range: {min: 10000, max: 100000000},
          options: {
            precision: 0,
            step: 100000,
            noSwitching: true,
            translate: function(value) {

              var shortVal = value/1000000;
              var precision = shortVal < 1 ? 2 : shortVal < 10 ? 1 : 0;
              if (value == 100000000) {
                return '$' + (shortVal).toFixed(precision) + 'm+';
              } else {
                return '$' + (shortVal).toFixed(precision) + 'm';
              }
            }
          }
        }
      };
    })
})();
