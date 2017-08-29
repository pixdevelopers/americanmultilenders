(function() {
    "use strict";
    angular.module('amlApp', ['ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true).hashPrefix("!");
            $routeProvider
                .when('/', {
                    controller: 'homeCtrl',
                    templateUrl: 'views/home.html'
                })
                .when('/forms', {
                    controller: 'formsCtrl',
                    templateUrl: 'views/forms.html'
                })
                .when('/contact', {
                    controller: 'contactCtrl',
                    templateUrl: 'views/contact.html'
                })
                .when('/admin/login', {
                    controller: 'loginCtrl',

                    templateUrl: 'views/admin-login.html'
                })
                .when('/admin/dashboard', {
                    controller: 'adminCtrl',

                    templateUrl: 'views/admin-home.html'
                })
                .when('/404', {
                    templateUrl: 'views/404.html'
                })
                .otherwise({
                    redirectTo: '/404'
                });
        })

        .controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {

            if (!$rootScope.isAuth) {
                $location.path('admin/login');
            }
            $scope.doLogin = function() {
                var data = { username: $scope.email, password: $scope.password };
                $http.post('api/login.php', data).then(function(res) {
                    console.log(res.data);
                    if (res.data) {
                        $rootScope.isAuth = true;
                        $location.path('admin/dashboard');
                    } else {
                        $location.path('admin/login')
                        $scope.unsuccessfull = true;
                    }
                });

            }

        }])
        .controller('adminCtrl', ['$scope', '$route', '$rootScope', '$location', '$http', function($scope, $route, $rootScope, $location, $http) {

            // if (!$rootScope.isAuth) {
            //     $location.path('admin/login');
            //     return false;
            // }
            $scope.addCat = function(cat) {
                var category = { request: 'add', category: cat };
                $http.post('api/rest.php', category).then(function(res) {
                    console.log(res.data);
                    $route.reload();
                });
            }
            $http.get('api/forms.php').then(function(res) {
                $scope.cats = angular.fromJson(res.data);
            });
            $scope.doLogout = function() {
                $rootScope.isAuth = false;
                $location.path('admin/login');
            }
            $scope.selectCat = function(category) {
                $scope.currentCat = category;
                $scope.currentCat.forms = angular.fromJson(category.forms);

            }
        }])
        .controller('contactCtrl', ['$http', '$scope', '$timeout', function($http, $scope, $timeout) {


            $scope.submitForm = function() {
                var data = {
                    name: $scope.name,
                    email: $scope.email,
                    message: $scope.message
                };
                $scope.loading = true;
                $scope.locked = true;

                $http.post('api/contact.php', data).then(function(res) {
                    console.log(res);
                    if (res.data) {
                        $scope.status = true;
                    } else $scope.status = false;
                    $scope.loading = false;
                    $timeout(function() {
                        // unlock and reset form after 30secs
                        $scope.locked = false;
                    }, 30000);

                });
            }

        }])
        .controller('homeCtrl', ['$http', '$scope', '$timeout', function($http, $scope, $timeout) {


            $scope.submitQuote = function(form) {
                var data = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    phone: $scope.phone,
                    email: $scope.email,
                    loanAmount: $scope.loanAmount,
                    propertyValue: $scope.propertyValue,
                    loanType: $scope.loanType,
                    history: $scope.history
                };

                $scope.loading = true;
                $scope.locked = true;

                $http.post('api/quote.php', data).then(function(res) {
                    console.log(res);
                    if (res.data) {
                        $scope.status = true;
                    } else $scope.status = false;
                    $scope.loading = false;
                    $timeout(function() {
                        // unlock and reset form after 30secs
                        $scope.locked = false;
                    }, 30000);

                });
            }

        }])
        .controller('formsCtrl', ['$http', '$scope', function($http, $scope) {
            $http.get('api/forms.php').then(function(res) {
                $scope.cats = angular.fromJson(res.data);
            });

            $scope.selectCat = function(category) {
                $scope.currentCat = category;
                $scope.currentCat.forms = angular.fromJson(category.forms);
            }

        }]);

})();