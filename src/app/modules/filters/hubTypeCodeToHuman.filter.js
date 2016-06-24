(function() {
  'use strict';

  angular
    .module('dscFe')
    .filter('hubTypeCodeToHuman', function() {
      var regions = {
        I: 'Incubator',
        A: 'Accelerator',
        CW: 'Co-working',
        E: 'Education',
        G: 'Government',
        C: 'Community',
        R: 'Research Centre'
      }

      return function(regionCode) {
        return regions[regionCode] || '';
      }

    })
})();
