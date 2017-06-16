'use strict';
/* Directives */
angular.module('F1FeederApp')
.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

.directive('leftPanel', function ($compile, $http) {
    alert('hi');
    return {
        // Restrict it to be an attribute in this case
        restrict: 'E',
        template:'<div>this is from directive</div>'      
    };
})
