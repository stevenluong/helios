'use strict';

/* App Module */

var mainApp = angular.module('mainApp', [
        'ngRoute',
        //'mainAnimations',
        'mainControllers',
        'mainFilters',
        'mainServices',
        'Devise'
]);
mainApp.config(['$routeProvider','AuthProvider','$httpProvider',
        function($routeProvider,AuthProvider,$httpProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'mainCtrl'
                }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'mainCtrl'
            }).
            when('/register', {
                templateUrl: 'partials/register.html',
                controller: 'mainCtrl'
            }).

            otherwise({
                redirectTo: '/'
            });
            AuthProvider.loginPath('https://slapps.fr/helios/ror/users/sign_in.json');
            AuthProvider.logoutPath('https://slapps.fr/helios/ror/users/sign_out.json');
            AuthProvider.registerPath('https://slapps.fr/helios/ror/users.json');
            $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        }]);
