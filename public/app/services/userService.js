// console.log('testing user service');
angular.module('userService', [])
  // .config(function (){
  //  console.log('testing user services again');
  .factory('User', function ($http){

   const userFactory = {};

    userFactory.create = function(regData){
      return $http.post('/api/users', regData)
    }
      return userFactory;
  });

  
