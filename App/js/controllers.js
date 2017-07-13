angular.module('F1FeederApp.controllers', []).

  /* Drivers controller */
  controller('homeController', ['$scope', 'ergastAPIservice', 'pagination', '$state', 'appConfig', function ($scope, ergastAPIservice, pagination, $state, $http, appConfig) {
     // var myInjector = angular.injector(["F1FeederApp.services"]);
    
      //var pagination = myInjector.get("pagination");
      $scope.nameFilter = null;
      $scope.driversList = [];
      var obj = { topics: ['Angular HOME', 'Angular Intro'] };
      str = JSON.stringify(obj);
      $scope.searchFilter = function (driver) {
          var re = new RegExp($scope.nameFilter, 'i');
          return !$scope.nameFilter || re.test(driver.displayName) || re.test(driver.displayName);
      };
      $scope.getInformationById = function (object) {
          //$state.go('driver', {
          //    "data": object
          //});
      }
      $scope.loadContent = function (item) {          
          $scope.defaultSelected = item;          
          $scope.tutorialTopics.forEach(function (item) {
              item.cls = "";
          })
          item.cls = "selectedItem";
      }
      $scope.loadPage = function (topic) {
          //$state.go('newPage');
          $scope.topic = topic;
      }

      ergastAPIservice.getTopics().success(function (response) {
          //Digging into the response to get the relevant data
          //$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          //$scope.tutorialTopics = response.topics;
          $scope.tutorialTopics = response.topics;
          pagination.setTotalPage($scope.tutorialTopics.length);
          $scope.defaultSelected = $scope.tutorialTopics[0];
      });
  }]).

  /* Driver controller */
  controller('driverController', function ($scope, $routeParams, ergastAPIservice, $rootScope, $stateParams) {
      var _data = $stateParams.data;
      $scope.id = _data.Driver.driverId;
      $scope.races = [];
      $scope.driver = null;
      ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
          $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      });

      ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
          $scope.races = response.MRData.RaceTable.Races;
      });
  }).

  controller('loginController', function($scope, $routeParams, ergastAPIservice, $location, appConfig) {

      $scope.id = $routeParams.id;
      $scope.races = [];
      $scope.driver = null;

      $scope.login = function () {
          // $location.path('/drivers');
          user_info = { uName: $scope.username, passWord: $scope.password };
          $.ajax({
              url: appConfig.BASE_URL + '/login',
              data: JSON.stringify(user_info),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: 'POST',
              success: function (data) {
                  if (data.response.status == 1)
                      $location.path('/drivers');
                  else {
                      $scope.$apply(function () {
                          $scope.loginError = true;
                      });

                  }
              },
              error: function (xhr, status, error) {
                  $scope.$apply(function () {
                      $scope.loginError = true;
                  });
              }
          });;
      }
      $scope.SignUp = function () {
          $location.path('/register');
      }
  }).
 controller('contentController', function ($scope, $routeParams, ergastAPIservice, $location) { })
.controller('registerController', function($scope, $routeParams, ergastAPIservice, $location, appConfig) {
    this.register = function () {

        user_info = { fName: this.user.firstName, lName: this.user.lastName, uName: this.user.username, eMail: this.user.uEmail, passWord: this.user.password };


        $.ajax({
        url: appConfig.BASE_URL + '/addUser',
            data: JSON.stringify(user_info),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: 'POST',

            success: function (data) {
                $location.path('/login');
            },
            error: function (xhr, status, error) {

                alert('error on user registeration');
            }
        });;
    }
});