// console.log('testing the authService');
angular.module('authService', [])
 // .config(function(){
  // console.log('testing auth service config');
    .factory('Auth', function ($http){

    const authFactory = {};

    authFactory.login = function(loginData){
      return $http.post('/api/authenticate', loginData)
    }
      return authFactory;
  });



 

  