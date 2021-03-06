// console.log("testing routes configuration");
angular.module('appRoutes', ['ngRoute'])
 .config(function($routeProvider, $locationProvider) {
  // console.log('testing our routes');
 $routeProvider

  .when('/', {
    templateUrl: 'app/views/pages/home.html'
   })

  .when('/about', {
    templateUrl: 'app/views/pages/about.html'
   })

  .when('/contact', {
    templateUrl: 'app/views/pages/contact.html'
   })

  .when('/register', {
    templateUrl: 'app/views/pages/users/register.html',
    controller: 'RegisterController',
    controllerAs: 'register'
   })

  .when('/login', {
    templateUrl: 'app/views/pages/users/login.html',
   })

  .when('/logout', {
    templateUrl: 'app/views/pages/users/logout.html',
   })

  .when('/profile', {
    templateUrl: 'app/views/pages/users/profile.html',
   })

  .when('/facebook/:token', {
    templateUrl: 'app/views/pages/users/social/social.html',
    controller:'facebookController',
    controllerAs: 'facebook'
   })

  .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({//get rid of the bases in the url
     enabled: true,
     requireBase: false
    });

 });