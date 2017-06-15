angular.module('F1FeederApp.controllers', []).

  /* Drivers controller */
  controller('driversController', ['$scope', 'ergastAPIservice', '$state',function($scope, ergastAPIservice,$state) {
      $scope.nameFilter = null;
      $scope.driversList = [];
      $scope.searchFilter = function (driver) {
          var re = new RegExp($scope.nameFilter, 'i');
          return !$scope.nameFilter || re.test(driver.displayName) || re.test(driver.displayName);
      };
      $scope.getInformationById = function (object) {
          $state.go('driver', {
              "data": object
          });
      }
      ergastAPIservice.getDrivers().success(function (response) {
          //Digging into the response to get the relevant data
          //$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          $scope.tutorialTopics = [];
          var topics = ["JavaScript", "AngularJs 1.4", "AngularJs 1.5", "AngularJs 1.6","Angular"]
          for (var i = 0; i < topics.length; i++) {
              $scope.tutorialTopics.push({ id: i + 1, displayName: topics[i], category: 'Front End' });
          }
      });
  }]).

  /* Driver controller */
  controller('driverController', function ($scope, $routeParams, ergastAPIservice, $rootScope, $stateParams) {
      var _data=$stateParams.data;
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

  controller('loginController', function ($scope, $routeParams, ergastAPIservice, $location) {

      $scope.id = $routeParams.id;
      $scope.races = [];
      $scope.driver = null;

      $scope.login = function () {
          // $location.path('/drivers');
          user_info = { uName: $scope.username, passWord: $scope.password };
          $.ajax({
              url: 'http://10.197.131.14:8080/login',
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
  })
.controller('registerController', function ($scope, $routeParams, ergastAPIservice, $location) {
    this.register = function () {
    
        user_info = { fName: this.user.firstName, lName: this.user.lastName, uName: this.user.username, eMail: this.user.uEmail, passWord: this.user.password };
    

        $.ajax({
            url: 'http://10.197.131.14:8080/addUser',
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