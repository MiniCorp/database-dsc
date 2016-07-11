

(function() {
 'use strict';

 angular
   .module('dscFe')
   .filter('ensureHttp', function() {
      return function(url) {
        if (!/^(f|ht)tps?:\/\//i.test(url)) {
           url = "http://" + url;
        }
        return url;
      };


   })
})();
