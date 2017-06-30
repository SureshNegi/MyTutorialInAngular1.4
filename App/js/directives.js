'use strict';
/* Directives */
angular.module('F1FeederApp')
.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

.directive('leftPanel', function ($compile, $http) {    
    return {
        // Restrict it to be an attribute in this case
        restrict: 'E',
        scope: { loadContent: '=', tutorialTopics: "=" },        
        //controller: function ($scope) {
        //    $scope.getData = function (item) {
        //        $scope.loadContent(item);
        //    }
        //},
        template: '<a href="javascript:void(0)" ng-repeat="item in tutorialTopics" ng-click="loadContent(item)"  >{{item.title}}</a>',
    };
})
.directive('contentDiv', function ($compile, $http) {
    return {        
        restrict: 'E',
        scope: { defaultSelected: '=' },
        templateUrl: 'partials/Content.html',
        controller: function ($scope) {
            console.log($scope.defaultSelected);
            $scope.isVideo = false;
            $scope.item = { contentUrl :''};            
            $scope.loadContent = function (item) {
                $scope.isVideo = false;
                $scope.item = item;               
                console.log($scope.item);
                //ergastAPIservice.getTopics().success(function (response) {
                //    //Digging into the response to get the relevant data
                //    //$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                //    $scope.tutorialTopics = response.topics;
                //});
                if (item.videoUrl && item.videoUrl.trim().length > 0) {
                    $scope.isVideo = true;
                    setTimeout(function () {                       
                        document.querySelector("#myVideoTag").src = item.videoUrl;
                    },10);
                }
            }
        },
    };
})
