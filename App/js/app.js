//var app = angular.module('F1FeederApp', ['ui.router', 'F1FeederApp.services', 'F1FeederApp.controllers']);
var app = angular.module('F1FeederApp', ['ui.router', 'ngRoute', 'F1FeederApp.services', 'F1FeederApp.controllers']);
//config(['$routeProvider', function($routeProvider) {
//  $routeProvider.
//	when("/drivers", {templateUrl: "partials/drivers.html", controller: "driversController"}).
//	when("/drivers/:id", { templateUrl: "partials/driver.html", controller: "driverController" }).
//    when("/login", { templateUrl: "partials/login.html", controller: "loginController" }).
//	otherwise({redirectTo: '/login'});
//}]);
app.config(function ($stateProvider, $urlRouterProvider) {
    // Push Interceptors 

    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'partials/register.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html'
        })
        .state('drivers', {
            url: '/drivers',
            templateUrl: 'partials/drivers.html'
        })
        .state('newPage', {
            url: '/newPage',
            templateUrl: 'partials/contents.html'
        })
        .state('driver', {
            url: '/driver',
            templateUrl: 'partials/driver.html',
            params: {
                data: null

            }
        })
    //.state('newPage', {
    //    url: '/newPage',
    //    views: {
    //        'graph': {
    //            templateUrl: 'partials/contents.html'
    //        },
    //        params: {
    //            data: null

    //        }
    //    }
    //})
    //$stateProvider.state(home);
    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise("/login");

})
.run(['$state', function ($rootScope, $state, $stateParams) {
    //$rootScope.$state = $state;   
    //$rootScope.$stateParams = $stateParams;
}])
