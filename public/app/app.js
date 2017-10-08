// console.log("testing app configuration");
angular.module('userApp', ['appRoutes', 'userController', 
                           'userService', 'ngAnimate', 
                           'mainController', 'authService'])
    // .config(function (){
   //  console.log("testing user application");
   // });
   .config(function ($httpProvider){
     $httpProvider.interceptors.push('AuthInterceptors');
   });