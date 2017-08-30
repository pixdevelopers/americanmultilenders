(function() {
    "use strict";
    angular.module('amlApp', ['ngRoute', 'ngCookies'])
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
        .run(['$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout) {


            $rootScope.$on('$routeChangeSuccess', function(next, current) {
                $timeout(function() {
                    $('.col-lg-3').matchHeight();
                }, 200);
            });
            $window.onload = function() {

                $('.counter').counterUp({
                    delay: 10,
                    time: 1000
                });
                $('.whoweare .container-1400').fadeOut();
                var stickynav = $('.tiny-text').waypoint({

                    handler: function(direction) {
                        if (direction === 'down') {
                            $('body').addClass('stickyontop');
                            $('.navigation-menu').addClass('stickyontop');

                        } else {
                            $('body').removeClass('stickyontop');
                            $('.navigation-menu').removeClass('stickyontop');
                        }
                    },
                    offset: -100
                });

                var waypoints = $('#about').waypoint({
                    handler: function(direction) {
                        $('.whoweare .container-1400').fadeIn();
                    },
                    offset: 250

                });


                $('.getaquote .container-1400').fadeOut();

                var waypoints = $('#getaquote').waypoint({
                    handler: function(direction) {
                        $('.getaquote .container-1400').fadeIn();
                    },
                    offset: 250

                });



                $("nav.navbar ul.nav li > a.scrollTo").click(function(e) {
                    e.preventDefault();
                    var href = $(this).attr("href").replace('/', '');
                    if (href == "#services") {
                        $('html,body').animate({ scrollTop: $(href).offset().top - 200 }, 400);
                    } else if (href == "#home") {
                        $('html,body').animate({ scrollTop: $('html').offset().top }, 400);
                    } else {
                        $('html,body').animate({ scrollTop: $(href).offset().top }, 400);

                    }
                });



            };
        }])

        .controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', '$cookies', function($scope, $rootScope, $location, $http, $cookies) {
            var isAuth = $cookies.get('isAuth');
            if (isAuth == 'loggedIn') {
                $location.path('admin/dashboard');
            }
            $scope.doLogin = function() {
                var data = { username: $scope.email, password: $scope.password };
                $http.post('api/login.php', data).then(function(res) {
                    if (res.data) {
                        $cookies.put('isAuth', 'loggedIn');
                        $location.path('admin/dashboard');
                    } else {
                        $location.path('admin/login');
                        console.log('Wrong Credentials');
                    }
                });

            }

        }])
        .controller('adminCtrl', ['$scope', '$route', '$rootScope', '$location', '$http', '$cookies', function($scope, $route, $rootScope, $location, $http, $cookies) {
            var isAuth = $cookies.get('isAuth');
            if (isAuth == 'loggedIn') {
                $http.get('api/forms.php').then(function(res) {
                    $scope.cats = angular.fromJson(res.data);
                });
            } else {
                $location.path('admin/login');
            }
            $scope.addCat = function(cat) {
                var category = { request: 'add', category: cat };
                $http.post('api/rest.php', category).then(function(res) {
                    console.log(res.data);
                    $route.reload();
                });
            }

            $scope.addForm = function(cat) {
                var category = { request: 'addForm', category: cat };
                $http.post('api/rest.php', category).then(function(res) {
                    console.log(res.data);
                    $route.reload();
                });
            }


            $scope.doLogout = function() {
                $cookies.put('isAuth', false);
                $location.path('admin/login');
            }

            $scope.selectCat = function(category) {
                $scope.addNewCat = false;
                $scope.currentCat = category;
                $scope.currentCat.forms = angular.fromJson(category.forms);

            }
            $scope.removeCat = function(cat) {
                var category = { request: 'remove', category: cat };
                if (confirm('Are you sure? This will remove all forms inside the category!')) {
                    $http.post('api/rest.php', category).then(function(res) {
                        console.log(res.data);
                        $route.reload();
                    });
                }

            }

            $scope.updateCat = function(cat) {
                var category = { request: 'update', category: cat };
                $http.post('api/rest.php', category).then(function(res) {
                    console.log(res.data);
                });


            }

            $scope.upload = function() {

                var fd = new FormData();
                var files = document.getElementById('file').files[0];
                fd.append('file', files);
                $http({
                    method: 'post',
                    url: 'api/upload.php',
                    data: fd,
                    headers: { 'Content-Type': undefined },
                }).then(function successCallback(response) {
                    console.log(response.data);
                    $scope.fileUploadResponse = response.data;

                });
            }

            $scope.addFormToCat = function(cat) {
                var base = $location.host();
                var downloadURL = $location.$$absUrl + '/' + $scope.fileUploadResponse.name;
                var req = {
                    request: 'upload',
                    category: cat,
                    file: {
                        downloadURL: 'http://' + base + '/uploads/forms/' + $scope.fileUploadResponse.name,
                        size: $scope.fileUploadResponse.size,
                        ext: $scope.fileUploadResponse.ext,
                        date: $scope.fileUploadResponse.date,
                        title: $scope.newFormTitle
                    }
                };
                $http.post('api/rest.php', req).then(function(res) {
                    console.log(res);
                });
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