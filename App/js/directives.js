'use strict';
/* Directives */
angular.module('F1FeederApp')
.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}])
.directive('dropDown', function ($compile, $http) {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'E',
        scope: { data: '=', selectedItem: "=",onSelect:"=" },
        template:'<select ng-model="selectedItem" ng-options="x.tech for x in data" ng-change="onSelect(selectedItem)" ></select>'
        
    };
})
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
        template: '<a href="javascript:void(0)" ng-repeat="item in tutorialTopics" ng-class="item.cls" ng-click="loadContent(item)"  >{{item.title}}</a>',
    };
})
.directive('topPanel', function ($compile, $http, pagination) {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'E',

        controller: function ($scope) {
            $scope.nextPage = function () {
                console.log($scope.tutorialTopics);
                var page = pagination.getNextPage();
                if (page == -1) {
                    //alert("no more");
                }
                else {
                    if (page > 1)
                        $scope.isHome = false;
                    $scope.loadContent($scope.tutorialTopics[page - 1]);
                    pagination.setCurrentPage(page);
                }
            }
            $scope.prevPage = function () {
                var page = pagination.getPrevPage();
                if (page == -1) {
                    alert("no more");
                }
                else {
                    if (page <= 2)
                        $scope.isHome = true;
                    $scope.loadContent($scope.tutorialTopics[page - 1]);
                    pagination.setCurrentPage(page);
                }
            }
        },
        templateUrl: 'partials/topPanel.html',
    };
})
.directive('contentDiv', function ($compile, $http) {
    return {
        restrict: 'E',
        scope: { defaultSelected: '=' },
        templateUrl: 'partials/Content.html',
        controller: function ($scope) {
            //alert('hi');
            console.log($scope.tutorialTopics);
            $scope.isVideo = false;
            var listner = $scope.$watch("defaultSelected", function () {
                if ($scope.defaultSelected) {
                    $scope.item = $scope.defaultSelected;
                    $scope.loadContent($scope.item);
                }
            });

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
                    }, 10);
                }
            }
        },
    };
})