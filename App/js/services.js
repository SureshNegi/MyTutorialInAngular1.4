angular.module('F1FeederApp.services', [])
  .factory('ergastAPIservice', function($http) {

    var ergastAPI = {};
      //https://www.toptal.com/angular-js/a-step-by-step-guide-to-your-first-angularjs-app
    ergastAPI.getTopics = function() {
      //return $http({
      //  method: 'JSONP', 
      //  url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
      //});
        return $http.get('data/angularjs1.4topcs.json') //reading the student.json file

             //.success(function (data) {
             //    $scope.students = data; // binding the data to the $scope variable
             //})
             //.error(function (data, status) {
             //    console.error('failure loading the student record', status, data);
             //    $scope.students = {}; //return blank record if something goes wrong
             //});
    }

    ergastAPI.getDriverDetails = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverRaces = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
      });
    }

    return ergastAPI;
  });