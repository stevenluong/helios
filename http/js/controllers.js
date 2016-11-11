'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers',[]);
mainControllers.controller('mainCtrl', ['$scope','Sources','Auth','$location',
        function($scope, Sources, Auth, $location) {
            $scope.signedIn = Auth.isAuthenticated;
            
            Auth.currentUser().then(function(user) {
                $scope.user = user;
            },function(error){
                //console.log(error);
            });
            //TODO
            $scope.logout = function(){
                console.log("logout");
                Auth.logout();
                $scope.user = {};
                $location.path("/");
            };

            $scope.login = function (){
                Auth.login($scope.user).then(function(user) {
                    console.log(user); // => {id: 1, ect: '...'}
                }, function(error) {
                    // Authentication failed...
                    console.log(error);
                });

            }; 
            $scope.register= function(){
                Auth.register($scope.user).then(function(user) {
                    console.log($scope.user);
                    $scope.user = user;
                    $location.path("/");
                });
            };


            $scope.$on('devise:login', function(event, currentUser) {
                console.log('devise:login');
                $scope.user = currentUser;
                $location.path("/");
                // after a login, a hard refresh, a new tab
            });

            $scope.$on('devise:new-session', function(event, currentUser) {
                console.log('devise:new-session');
                $scope.user = currentUser;
                $location.path("/");
                // user logged in by Auth.login({...})
            });
            //Sources.getSources().success(function(response){
            //    console.log(response);
            //});
        }]);
